package org.jboss.examples.noveabank.transactions.rest;

import org.jboss.examples.noveabank.customer.model.Contact;
import org.jboss.examples.noveabank.customer.model.Customer;
import org.jboss.examples.noveabank.customer.services.CustomerService;
import org.jboss.examples.noveabank.transactions.model.Payment;
import org.jboss.examples.noveabank.transactions.rest.dto.PaymentDTO;
import org.jboss.examples.noveabank.transactions.services.PaymentException;
import org.jboss.examples.noveabank.transactions.services.PaymentService;

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
public class PaymentsResource {

    @Context
    private UriInfo uriInfo;

    @PersistenceContext(unitName = "Noveabank-persistence-unit")
    private EntityManager em;

    @Inject
    private PaymentService paymentService;

    @Inject
    private CustomerService customerService;

    @POST
    @Consumes("application/json")
    public Response create(PaymentDTO dto) {
        String customerSubjectId = uriInfo.getPathParameters().getFirst("id");
        Customer from = customerService.findBySubjectId(customerSubjectId);
        Long payeeId = dto.getPayeeId();
        if(payeeId == null) {
            throw new PaymentException("Contact was not specified.");
        }
        Contact to = em.find(Contact.class, payeeId);
        if(to == null) {
            throw new PaymentException("Contact was not specified.");
        }
        Payment payment = paymentService.newOutgoingPayment(from, to, dto.getAmount());
        return Response.created(uriInfo.getAbsolutePathBuilder().path(String.valueOf(payment.getId())).build())
                .build();
    }
}
