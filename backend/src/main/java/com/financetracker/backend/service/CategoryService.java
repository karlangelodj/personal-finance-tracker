package com.financetracker.backend.service;

import com.financetracker.backend.dto.CategoryRequestDTO;
import com.financetracker.backend.dto.CategoryResponseDTO;
import com.financetracker.backend.exception.ResourceNotFoundException;
import com.financetracker.backend.model.Category;
import com.financetracker.backend.repository.CategoryRepository;
import com.financetracker.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public CategoryService(CategoryRepository categoryRepository,
                           TransactionRepository transactionRepository) {
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public List<CategoryResponseDTO> getCategoriesByType(String type) {
        List<String> types = type.equals("INCOME")
                ? List.of("INCOME", "BOTH")
                : List.of("EXPENSE", "BOTH");
        return categoryRepository.findByTypeIn(types).stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public CategoryResponseDTO createCategory(CategoryRequestDTO dto) {
        // Check for duplicate name
        categoryRepository.findByNameIgnoreCase(dto.getName()).ifPresent(existing -> {
            throw new IllegalArgumentException("Category '" + dto.getName() + "' already exists");
        });

        Category category = new Category();
        category.setName(dto.getName());
        category.setType(dto.getType());
        category.setIcon(dto.getIcon() != null ? dto.getIcon() : "⭐");
        category.setIsDefault(false);

        return toResponseDTO(categoryRepository.save(category));
    }

    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        if (category.getIsDefault()) {
            throw new IllegalArgumentException("Default categories cannot be renamed");
        }

        // Check duplicate name excluding current
        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(dto.getName(), id)) {
            throw new IllegalArgumentException("Category '" + dto.getName() + "' already exists");
        }

        category.setName(dto.getName());
        category.setIcon(dto.getIcon() != null ? dto.getIcon() : category.getIcon());
        return toResponseDTO(categoryRepository.save(category));
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        if (category.getIsDefault()) {
            throw new IllegalArgumentException("Default categories cannot be deleted");
        }

        // Check if category is in use
        long usageCount = transactionRepository.findAll().stream()
                .filter(t -> t.getCategory().equalsIgnoreCase(category.getName()))
                .count();

        if (usageCount > 0) {
            throw new IllegalArgumentException(
                "Cannot delete category '" + category.getName() + "' — it is used by " + usageCount + " transaction(s)");
        }

        categoryRepository.deleteById(id);
    }

    // --- Helper ---

    private CategoryResponseDTO toResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getType(),
                category.getIcon(),
                category.getIsDefault()
        );
    }
}