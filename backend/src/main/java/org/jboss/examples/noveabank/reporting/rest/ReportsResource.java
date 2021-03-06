package org.jboss.examples.noveabank.reporting.rest;

import org.jboss.examples.noveabank.accounting.model.Account;
import org.jboss.examples.noveabank.accounting.model.AccountBalanceHistory;
import org.jboss.examples.noveabank.accounting.model.EntryType;
import org.jboss.examples.noveabank.accounting.model.JournalEntry;
import org.jboss.examples.noveabank.customer.model.Customer;
import org.jboss.examples.noveabank.customer.services.CustomerService;
import org.jboss.examples.noveabank.money.model.Money;
import org.jboss.examples.noveabank.core.rest.dto.DateWrapper;
import org.jboss.examples.noveabank.reporting.rest.dto.StatementLineItemDTO;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Stateless
public class ReportsResource {

    @Context
    private UriInfo uriInfo;

    @PersistenceContext(unitName = "Noveabank-persistence-unit")
    private EntityManager em;

    @Inject
    private CustomerService customerService;

    @GET
    @Path("/monthly")
    @Produces("application/json")
    public Response getMonthlyReport(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult) {
        LocalDate start = LocalDate.now().withDayOfMonth(1);
        TypedQuery<JournalEntry> findAllQuery = em.createQuery("SELECT DISTINCT j FROM JournalEntry j LEFT JOIN FETCH j.financialEvent WHERE j.account = :accountId AND j.dateTime >= :start ORDER BY j.id, j.dateTime", JournalEntry.class);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        String customerSubjectId = uriInfo.getPathParameters().getFirst("id");
        Customer customer = customerService.findBySubjectId(customerSubjectId);
        findAllQuery.setParameter("accountId", customer.getCustomerAccount().getFinancialAccount());
        findAllQuery.setParameter("start", Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        final List<JournalEntry> searchResults = findAllQuery.getResultList();

        TypedQuery<AccountBalanceHistory> accountBalanceHistoryQuery = em.createQuery("SELECT DISTINCT bal FROM AccountBalanceHistory bal WHERE bal.account = :account AND bal.date = :date", AccountBalanceHistory.class);
        accountBalanceHistoryQuery.setParameter("account", customer.getCustomerAccount().getFinancialAccount());
        accountBalanceHistoryQuery.setParameter("date", Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant()));

        Money openingBalance = null;
        Date openDate = null;
        try{
            AccountBalanceHistory monthlyStartingAccountBalance = accountBalanceHistoryQuery.getSingleResult();
            openingBalance = monthlyStartingAccountBalance.getOpeningBalance();
            openDate = monthlyStartingAccountBalance.getDate();
        } catch (NoResultException noRes) {
            openingBalance = customer.getCustomerAccount().getFinancialAccount().getOpeningBalance();
            openDate = customer.getCustomerAccount().getFinancialAccount().getPeriodOpenDate();
        }

        StatementLineItemDTO openingBalanceStatement = new StatementLineItemDTO();
        openingBalanceStatement.setDescription("Opening Balance");
        Money runningBalance = openingBalance;
        openingBalanceStatement.setBalance(runningBalance);

        final List<StatementLineItemDTO> results = new ArrayList<>();
        results.add(openingBalanceStatement);
        for (JournalEntry searchResult : searchResults) {
            runningBalance = searchResult.getType() == EntryType.CREDIT ? runningBalance.add(searchResult.getAmount()) : runningBalance.subtract(searchResult.getAmount());
            StatementLineItemDTO dto = new StatementLineItemDTO(searchResult);
            dto.setBalance(runningBalance);
            results.add(dto);
        }
        return Response.ok(results)
                .build();
    }

    @GET
    @Path("/yearly")
    @Produces("application/json")
    public Response getYearlyReport(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult) {
        LocalDate start = LocalDate.now().withDayOfMonth(1).withDayOfYear(1);
        TypedQuery<JournalEntry> findAllQuery = em.createQuery("SELECT DISTINCT j FROM JournalEntry j WHERE j.account = :accountId AND j.dateTime >= :start ORDER BY j.id, j.dateTime", JournalEntry.class);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        String customerSubjectId = uriInfo.getPathParameters().getFirst("id");
        Customer customer = customerService.findBySubjectId(customerSubjectId);
        findAllQuery.setParameter("accountId", customer.getCustomerAccount().getFinancialAccount());
        findAllQuery.setParameter("start", Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        final List<JournalEntry> searchResults = findAllQuery.getResultList();

        TypedQuery<AccountBalanceHistory> accountBalanceHistoryQuery = em.createQuery("SELECT DISTINCT bal FROM AccountBalanceHistory bal WHERE bal.account = :account AND bal.date = :date", AccountBalanceHistory.class);
        accountBalanceHistoryQuery.setParameter("account", customer.getCustomerAccount().getFinancialAccount());
        accountBalanceHistoryQuery.setParameter("date", Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant()));

        Money openingBalance = null;
        Date openDate = null;
        try{
            AccountBalanceHistory yearlyStartingAccountBalance = accountBalanceHistoryQuery.getSingleResult();
            openingBalance = yearlyStartingAccountBalance.getOpeningBalance();
            openDate = yearlyStartingAccountBalance.getDate();
        } catch (NoResultException noRes) {
            openingBalance = customer.getCustomerAccount().getFinancialAccount().getOpeningBalance();
            openDate = customer.getCustomerAccount().getFinancialAccount().getPeriodOpenDate();
        }

        StatementLineItemDTO openingBalanceStatement = new StatementLineItemDTO();
        openingBalanceStatement.setDescription("Opening Balance");
        Money runningBalance = openingBalance;
        openingBalanceStatement.setBalance(runningBalance);

        final List<StatementLineItemDTO> results = new ArrayList<>();
        results.add(openingBalanceStatement);
        for (JournalEntry searchResult : searchResults) {
            runningBalance = searchResult.getType() == EntryType.CREDIT ? runningBalance.add(searchResult.getAmount()) : runningBalance.subtract(searchResult.getAmount());
            StatementLineItemDTO dto = new StatementLineItemDTO(searchResult);
            dto.setBalance(runningBalance);
            results.add(dto);
        }
        return Response.ok(results)
                .build();
    }

    @GET
    @Produces("application/json")
    public Response getCustomReport(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult, @QueryParam("fromDate") DateWrapper wrappedFrom, @QueryParam("toDate") DateWrapper wrappedTo) {
        Date from = wrappedFrom == null ? null : wrappedFrom.getDate();
        Date to = wrappedTo == null ? null : wrappedTo.getDate();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<JournalEntry> q = cb.createQuery(JournalEntry.class);
        Root<JournalEntry> j = q.from(JournalEntry.class);
        ParameterExpression<Account> accountParam = cb.parameter(Account.class);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(j.get("account"), accountParam));
        if(from != null) {
            javax.persistence.criteria.Path<Date> dateTime = j.get("dateTime");
            predicates.add(cb.greaterThanOrEqualTo(dateTime, from));
        }
        if(to != null) {
            javax.persistence.criteria.Path<Date> dateTime = j.get("dateTime");
            // Adjust the date by one more day, as date comparison will result
            // in ignoring transactions occurring after 12:00 AM.
            Date nextDay = Date.from(Instant.from(to.toInstant().atZone(ZoneId.systemDefault()).plusDays(1)));
            predicates.add(cb.lessThanOrEqualTo(dateTime, nextDay));
        }
        q.select(j)
                .where(predicates.toArray(new Predicate[]{}))
                .orderBy(cb.asc(j.get("id")), cb.asc(j.get("dateTime")));

        TypedQuery<JournalEntry> findAllQuery = em.createQuery(q);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        String customerSubjectId = uriInfo.getPathParameters().getFirst("id");
        Customer customer = customerService.findBySubjectId(customerSubjectId);
        findAllQuery.setParameter(accountParam, customer.getCustomerAccount().getFinancialAccount());
        final List<JournalEntry> searchResults = findAllQuery.getResultList();
        final List<StatementLineItemDTO> results = new ArrayList<>();

        TypedQuery<AccountBalanceHistory> accountBalanceHistoryQuery = em.createQuery("SELECT DISTINCT bal FROM AccountBalanceHistory bal WHERE bal.account = :account AND bal.date = :date", AccountBalanceHistory.class);
        accountBalanceHistoryQuery.setParameter("account", customer.getCustomerAccount().getFinancialAccount());
        accountBalanceHistoryQuery.setParameter("date", from);

        Money openingBalance = null;
        Date openDate = null;
        try{
            AccountBalanceHistory periodOpenAccountBalance = accountBalanceHistoryQuery.getSingleResult();
            openingBalance = periodOpenAccountBalance.getOpeningBalance();
            openDate = periodOpenAccountBalance.getDate();
        } catch (NoResultException noRes) {
            Date accountOpenDate = customer.getCustomerAccount().getFinancialAccount().getPeriodOpenDate();
            if((from != null && (from.equals(accountOpenDate) || from.before(accountOpenDate)))
                    || (to != null && (to.equals(accountOpenDate) || to.after(accountOpenDate)))
                    || (from == null && to == null)) {
                openDate = accountOpenDate;
                openingBalance = customer.getCustomerAccount().getFinancialAccount().getOpeningBalance();
            }
        }

        if(openDate != null) {
            StatementLineItemDTO openingBalanceStatement = new StatementLineItemDTO();
            openingBalanceStatement.setDescription("Opening Balance");
            Money runningBalance = openingBalance;
            openingBalanceStatement.setBalance(runningBalance);
            results.add(openingBalanceStatement);

            for (JournalEntry searchResult : searchResults) {
                runningBalance = searchResult.getType() == EntryType.CREDIT ? runningBalance.add(searchResult.getAmount()) : runningBalance.subtract(searchResult.getAmount());
                StatementLineItemDTO dto = new StatementLineItemDTO(searchResult);
                dto.setBalance(runningBalance);
                results.add(dto);
            }
        }
        return Response.ok(results)
                .build();
    }
}
