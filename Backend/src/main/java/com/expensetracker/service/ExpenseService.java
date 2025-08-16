package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import java.util.List;
import java.util.Optional;

public interface ExpenseService {
    Expense saveExpense(Expense expense);
    List<Expense> getAllExpensesByUser(User user);
    Optional<Expense> getExpenseById(Long id);
    Expense updateExpense(Long id, Expense expense);
    void deleteExpense(Long id);
}

