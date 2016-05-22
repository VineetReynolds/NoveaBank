package org.jboss.examples.noveabank.customer.services;

import org.jboss.examples.noveabank.accounting.model.Account;
import org.jboss.examples.noveabank.accounting.model.AccountType;
import org.jboss.examples.noveabank.accounting.services.Accounts;
import org.jboss.examples.noveabank.customer.iban.USIban;
import org.jboss.examples.noveabank.customer.model.CustomerAccount;
import org.jboss.examples.noveabank.money.model.Money;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class CustomerAccounts {

    @PersistenceContext
    private EntityManager em;

    @Inject
    private Accounts accounts;


    public CustomerAccount findByIBAN(String iban) {
        TypedQuery<CustomerAccount> findByIBANQuery = em.createQuery("SELECT DISTINCT c FROM CustomerAccount c WHERE c.iban = :iban ORDER BY c.id", CustomerAccount.class);
        findByIBANQuery.setParameter("iban", iban);
        CustomerAccount customerAccount;
        try {
            customerAccount = findByIBANQuery.getSingleResult();
        } catch (NoResultException nre) {
            customerAccount = null;
        }
        return customerAccount;
    }

    public CustomerAccount create(String name, Money openingBalance) {
        Account liabilitiesAccount = accounts.getLiabilitiesAccount();
        if(liabilitiesAccount == null) {
            throw new CustomerAccountException("Failed to find a parent Liabilities account for the customer account.");
        }
        Account financialAccount = accounts.newAccount(null, name, AccountType.LIABILITY, liabilitiesAccount, openingBalance);
        Long id = financialAccount.getId();
        String accountId = String.format("2%019d", id);

        String iban = new USIban.Builder()
                .bankCode("PLUS")
                .accountNumber(accountId)
                .build()
                .toFormattedString();
        CustomerAccount customerAccount = new CustomerAccount();
        customerAccount.setFinancialAccount(financialAccount);
        customerAccount.setIban(iban);
        em.persist(customerAccount);
        return customerAccount;
    }

    public List<CustomerAccount> listAll() {
        TypedQuery<CustomerAccount> findAllQuery = em.createQuery("SELECT DISTINCT c FROM CustomerAccount c ORDER BY c.id", CustomerAccount.class);
        return findAllQuery.getResultList();
    }
}
