package org.jboss.examples.noveabank.transactions.model;

import org.jboss.examples.noveabank.customer.model.Customer;
import org.jboss.examples.noveabank.money.model.Money;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Withdrawal extends Event {

    @ManyToOne
    private Customer withdrawer;

    public Customer getWithdrawer() {
        return withdrawer;
    }

    public void setWithdrawer(Customer withdrawer) {
        this.withdrawer = withdrawer;
    }

    @Embedded
    private Money withdrawalAmount;

    public Money getWithdrawalAmount() {
        return withdrawalAmount;
    }

    public void setWithdrawalAmount(Money withdrawalAmount) {
        this.withdrawalAmount = withdrawalAmount;
    }
}
