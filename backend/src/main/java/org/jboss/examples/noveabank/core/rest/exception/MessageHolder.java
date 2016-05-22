package org.jboss.examples.noveabank.core.rest.exception;

import org.jboss.examples.noveabank.core.exception.BusinessException;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
public class MessageHolder implements Serializable {

    private String message;

    public MessageHolder(BusinessException ex) {
        this.message = ex.getMessage();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
