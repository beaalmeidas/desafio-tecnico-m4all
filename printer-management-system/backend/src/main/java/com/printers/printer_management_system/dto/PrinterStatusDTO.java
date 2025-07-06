package com.printers.printerManagementSystem.dto;


public class PrinterStatusDTO {
    private String status;
    private Integer paperLevel;

    public PrinterStatusDTO(String status, Integer paperLevel) {
        this.status = status;
        this.paperLevel = paperLevel;
    }

    public String getStatus() {
        return status;
    }

    public Integer getPaperLevel() {
        return paperLevel;
    }
}
