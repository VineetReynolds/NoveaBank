package org.jboss.examples.noveabank.customer.rest;

import org.jboss.ejb3.annotation.SecurityDomain;
import org.jboss.examples.noveabank.customer.model.Customer;
import org.jboss.examples.noveabank.customer.rest.dto.CustomerDTO;
import org.jboss.examples.noveabank.reporting.rest.ReportsResource;
import org.jboss.examples.noveabank.customer.services.CustomerService;
import org.jboss.examples.noveabank.customer.services.CustomerUpdateException;
import org.jboss.examples.noveabank.transactions.rest.DepositsResource;
import org.jboss.examples.noveabank.transactions.rest.PaymentsResource;
import org.jboss.examples.noveabank.transactions.rest.WithdrawalsResource;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.representations.AccessToken;

import javax.annotation.security.PermitAll;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriBuilder;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@Stateless
@Path("/customers")
@SecurityDomain("keycloak")
@PermitAll
public class CustomerResource {

    @PersistenceContext(unitName = "Noveabank-persistence-unit")
    private EntityManager em;

    @Inject
    private ContactResource contactResource;

    @Inject
    private DepositsResource depositsResource;

    @Inject
    private WithdrawalsResource withdrawalsResource;

    @Inject
    private PaymentsResource paymentsResource;

    @Inject
    private ReportsResource reportsResource;

    @Inject
    private CustomerService customerService;

    @Context
    private HttpServletRequest httpRequest;

    @Context
    private SecurityContext securityContext;

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response create(CustomerDTO dto) {
        Customer customer = customerService.create(dto);
        return Response.created(UriBuilder.fromResource(CustomerResource.class).path(String.valueOf(customer.getId())).build())
                .entity(new CustomerDTO(customer))
                .build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteById(@PathParam("id") String id) {
        boolean deleted = customerService.delete(id);
        if (deleted) {
            return Response.noContent()
                    .build();
        } else {
            return Response.status(Status.NOT_FOUND)
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Response findById(@PathParam("id") String id) {
        String subjectId = securityContext.getUserPrincipal().getName();
        Customer customer = customerService.findBySubjectId(subjectId);
        if(customer == null) {
            CustomerDTO newCustomer = new CustomerDTO();
            KeycloakPrincipal principal = (KeycloakPrincipal) securityContext.getUserPrincipal();
            AccessToken token = principal.getKeycloakSecurityContext().getToken();
            newCustomer.setFullName(token.getName());
            newCustomer.setEmailAddress(token.getEmail());
            newCustomer.setPhoneNumber(token.getPhoneNumber());
            newCustomer.setSubjectId(subjectId);
            customer = customerService.create(newCustomer);
        }
        else {
            customer = customerService.findBySubjectId(subjectId);
            if (customer == null) {
                return Response.status(Status.NOT_FOUND)
                        .build();
            }
        }
        CustomerDTO dto = new CustomerDTO(customer);
        return Response.ok(dto)
                .build();
    }

    @GET
    @Produces("application/json")
    public Response listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult) {
        List<Customer> searchResults = customerService.listAll(startPosition, maxResult, null);
        final List<CustomerDTO> results = new ArrayList<CustomerDTO>();
        for (Customer searchResult : searchResults) {
            CustomerDTO dto = new CustomerDTO(searchResult);
            results.add(dto);
        }
        return Response.ok(results)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    public Response update(@PathParam("id") String id, CustomerDTO dto) {
        if (dto == null) {
            return Response.status(Status.BAD_REQUEST)
                    .build();
        }
        if (!id.equals(dto.getSubjectId())) {
            return Response.status(Status.CONFLICT).entity(dto)
                    .build();
        }
        try {
            Customer updatedCustomer = customerService.update(dto);
            if (updatedCustomer == null) {
                return Response.status(Status.NOT_FOUND)
                        .build();
            }
            CustomerDTO responseDto = new CustomerDTO(updatedCustomer);
            return Response.ok(responseDto)
                    .build();
        } catch (CustomerUpdateException e) {

            return Response.status(Status.CONFLICT).entity(e.getMessage())
                    .build();
        }
    }

    @Path("/{id}/contacts")
    public ContactResource getContactResource(@PathParam("id") String id) {
        Customer customer = customerService.findBySubjectId(id);
        if (customer == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
        return contactResource;
    }

    @Path("/{id}/deposits")
    public DepositsResource getDepositsResource(@PathParam("id") String id) {
        Customer customer = customerService.findBySubjectId(id);
        if (customer == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
        return depositsResource;
    }

    @Path("/{id}/withdrawals")
    public WithdrawalsResource getWithdrawalsResource(@PathParam("id") String id) {
        Customer customer = customerService.findBySubjectId(id);
        if (customer == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
        return withdrawalsResource;
    }

    @Path("/{id}/payments")
    public PaymentsResource getPaymentsResource(@PathParam("id") String id) {
        Customer customer = customerService.findBySubjectId(id);
        if (customer == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
        return paymentsResource;
    }

    @Path("/{id}/reports")
    public ReportsResource getReportResource(@PathParam("id") String id) {
        Customer customer = customerService.findBySubjectId(id);
        if (customer == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
        return reportsResource;
    }

}
