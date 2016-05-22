package org.jboss.examples.noveabank.transactions.rest.dto;

import org.jboss.examples.noveabank.transactions.model.Withdrawal;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;

@XmlRootElement
public class WithdrawalDTO implements Serializable {

    private BigDecimal amount;

    public WithdrawalDTO() {
    }

    public WithdrawalDTO(final Withdrawal entity) {
        if (entity != null) {
            this.amount = entity.getWithdrawalAmount().getAmount();
        }
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}