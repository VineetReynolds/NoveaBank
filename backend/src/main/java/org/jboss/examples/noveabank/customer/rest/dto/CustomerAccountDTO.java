package org.jboss.examples.noveabank.customer.rest.dto;

import org.jboss.examples.noveabank.customer.model.CustomerAccount;
import org.jboss.examples.noveabank.money.model.Money;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class CustomerAccountDTO implements Serializable {

    private Long accountId;

    private String iban;

    private Money balance;

    private Date lastUpdatedOn;

    public CustomerAccountDTO() {
    }

    public CustomerAccountDTO(final CustomerAccount entity) {
        if (entity != null) {
            this.accountId = entity.getId();
            this.iban = entity.getIban();
            this.balance = entity.getFinancialAccount().getCurrentBalance();
            this.lastUpdatedOn = entity.getFinancialAccount().getLastUpdatedOn();
        }
    }

    public CustomerAccount fromDTO(CustomerAccount entity, EntityManager em) {
        throw new IllegalStateException("This is not expected to be invoked.");
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public Money getBalance() {
        return balance;
    }

    public void setBalance(Money balance) {
        this.balance = balance;
    }

    public Date getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public void setLastUpdatedOn(Date lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
    }
}
