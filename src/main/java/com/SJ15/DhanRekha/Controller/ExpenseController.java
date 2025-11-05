package com.SJ15.DhanRekha.Controller;
import com.SJ15.DhanRekha.Entity.Expense;
import com.SJ15.DhanRekha.Repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseRepository expenseRepository;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        // validation omitted for brevity
        return expenseRepository.save(expense);
    }

    // Simple filter endpoint: pass query params (member, type, paymentType, dateFrom, dateTo)
    @GetMapping
    public List<Expense> filter(
            @RequestParam(required = false) Long addedBy,
            @RequestParam(required = false) String expenseType,
            @RequestParam(required = false) String paymentType,
            @RequestParam(required = false) Long groupId
    ) {
        // For MVP: simple conditional repository queries are fine.
        // Here we do a very simple implementation using custom query methods in repository
        if (addedBy != null) return expenseRepository.findByAddedBy(addedBy, Sort.by("createdAt").descending());
        if (groupId != null) return expenseRepository.findByGroupId(groupId, Sort.by("createdAt").descending());
        if (expenseType != null) return expenseRepository.findByExpenseType(expenseType, Sort.by("createdAt").descending());
        if (paymentType != null) return expenseRepository.findByPaymentType(paymentType, Sort.by("createdAt").descending());
        return expenseRepository.findAll(Sort.by("createdAt").descending());
    }
}
