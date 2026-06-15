package com.financetracker.backend.dto;

public class CategoryResponseDTO {

    private Long id;
    private String name;
    private String type;
    private String icon;
    private Boolean isDefault;

    public CategoryResponseDTO(Long id, String name, String type, String icon, Boolean isDefault) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.isDefault = isDefault;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public String getIcon() { return icon; }
    public Boolean getIsDefault() { return isDefault; }
}