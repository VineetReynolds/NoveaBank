package org.jboss.examples.noveabank.transactions.rest;

import org.jboss.examples.noveabank.customer.model.Customer;
import org.jboss.examples.noveabank.customer.services.CustomerService;
import org.jboss.examples.noveabank.transactions.model.Deposit;
import org.jboss.examples.noveabank.transactions.rest.dto.DepositDTO;
import org.jboss.examples.noveabank.transactions.services.DepositService;

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
public class DepositsResource {

    @Context
    private UriInfo uriInfo;

    @PersistenceContext(unitName = "Noveabank-persistence-unit")
    private EntityManager em;

    @Inject
    private DepositService depositService;

    @Inject
    private CustomerService customerService;

    @POST
    @Consumes("application/json")
    public Response create(DepositDTO dto) {
        String customerSubjectId = uriInfo.getPathParameters().getFirst("id");
        Customer customer = customerService.findBySubjectId(customerSubjectId);
        Deposit deposit = depositService.newDeposit(customer, dto.getAmount());
        return Response.created(uriInfo.getAbsolutePathBuilder().path(String.valueOf(deposit.getId())).build())
                .build();
    }
}
