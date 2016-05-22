package org.jboss.examples.noveabank.transactions.rest;

import org.jboss.examples.noveabank.customer.model.Customer;
import org.jboss.examples.noveabank.customer.services.CustomerService;
import org.jboss.examples.noveabank.transactions.model.Withdrawal;
import org.jboss.examples.noveabank.transactions.rest.dto.WithdrawalDTO;
import org.jboss.examples.noveabank.transactions.services.WithdrawalService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Stateless
public class WithdrawalsResource {

    @Context
    private UriInfo uriInfo;

    @PersistenceContext(unitName = "Noveabank-persistence-unit")
    private EntityManager em;

    @Inject
    private WithdrawalService withdrawalService;

    @Inject
    private CustomerService customerService;

    @POST
    @Consumes("application/json")
    public Response create(WithdrawalDTO dto) {
        String customerSubjectId = uriInfo.getPathParameters().getFirst("id");
        Customer customer = customerService.findBySubjectId(customerSubjectId);
        Withdrawal withdrawal = withdrawalService.newWithdrawal(customer, dto.getAmount());
        return Response.created(uriInfo.getAbsolutePathBuilder().path(String.valueOf(withdrawal.getId())).build())
                .build();
    }
}
