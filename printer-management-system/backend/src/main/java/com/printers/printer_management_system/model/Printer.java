package com.printers.printerManagementSystem.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;


@Entity
public class Printer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String model;
    private String location;

    @Enumerated(EnumType.STRING)
    private PrinterStatus status;

    private Integer paperCapacity;

    private OffsetDateTime createdAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public PrinterStatus getStatus() {
        return status;
    }

    public void setStatus(PrinterStatus status) {
        this.status = status;
    }

    public Integer getPaperCapacity() {
        return paperCapacity;
    }

    public void setPaperCapacity(Integer paperCapacity) {
        this.paperCapacity = paperCapacity;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
