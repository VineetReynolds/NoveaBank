package org.jboss.examples.noveabank.reporting.rest.dto;

import org.jboss.examples.noveabank.accounting.model.EntryType;
import org.jboss.examples.noveabank.accounting.model.JournalEntry;
import org.jboss.examples.noveabank.money.model.Money;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class StatementLineItemDTO implements Serializable {

    private Long id;

    private Date dateTime;

    private String description;

    private String type;

    private Money amount;

    private Money balance;

    public StatementLineItemDTO() {

    }

    public StatementLineItemDTO(JournalEntry entity) {
        if (entity != null) {
            this.id = entity.getId();
            this.dateTime = entity.getDateTime();
            this.description = entity.getFinancialEvent().getDescription();
            this.type = entity.getType() == EntryType.CREDIT ? "Deposit" : "Withdrawal";
            this.amount = entity.getAmount();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Money getAmount() {
        return amount;
    }

    public void setAmount(Money amount) {
        this.amount = amount;
    }

    public Money getBalance() {
        return balance;
    }

    public void setBalance(Money balance) {
        this.balance = balance;
    }
}
