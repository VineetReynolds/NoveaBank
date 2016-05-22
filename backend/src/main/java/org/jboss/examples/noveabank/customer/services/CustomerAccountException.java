package org.jboss.examples.noveabank.customer.services;

import org.jboss.examples.noveabank.core.exception.BusinessException;

import javax.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class CustomerAccountException extends BusinessException {

    public CustomerAccountException() {
        super();
    }

    public CustomerAccountException(String message) {
        super(message);
    }

    public CustomerAccountException(String message, Throwable cause) {
        super(message, cause);
    }

    public CustomerAccountException(Throwable cause) {
        super(cause);
    }
}
