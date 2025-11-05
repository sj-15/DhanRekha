package com.SJ15.DhanRekha.Repository;

import com.SJ15.DhanRekha.Entity.Expense;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Override
    Optional<Expense> findById(Long id);

    List<Expense> findByAddedBy(Long addedBy, Sort createdAt);

    List<Expense> findByGroupId(Long groupId, Sort createdAt);

    List<Expense> findByExpenseType(String expenseType, Sort createdAt);

    List<Expense> findByPaymentType(String paymentType, Sort createdAt);
}
