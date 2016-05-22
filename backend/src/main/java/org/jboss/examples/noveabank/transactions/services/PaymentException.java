package org.jboss.examples.noveabank.transactions.services;

import org.jboss.examples.noveabank.core.exception.BusinessException;

import javax.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class PaymentException extends BusinessException {

    public PaymentException() {
    }

    public PaymentException(String message) {
        super(message);
    }

    public PaymentException(String message, Throwable cause) {
        super(message, cause);
    }

    public PaymentException(Throwable cause) {
        super(cause);
    }
}
