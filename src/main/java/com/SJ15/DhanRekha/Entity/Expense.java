package com.SJ15.DhanRekha.Entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "expenses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Expense {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_id")
    private Long groupId; // nullable for personal

    @Column(name = "added_by")
    private Long addedBy;

    private BigDecimal amount;

    @Column(name = "money_flow")
    private String moneyFlow; // IN or OUT

    @Column(name = "expense_type")
    private String expenseType; // grocery, travel, custom

    @Column(name = "payment_type")
    private String paymentType; // Cash, UPI, Card, etc.

    private String note;

    private OffsetDateTime createdAt = OffsetDateTime.now();
}
