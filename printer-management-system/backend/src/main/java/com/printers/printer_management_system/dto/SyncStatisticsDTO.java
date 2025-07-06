package com.printers.printerManagementSystem.dto;

import java.time.OffsetDateTime;


public class SyncStatisticsDTO {
    private int totalProcessed;
    private int created;
    private int updated;
    private OffsetDateTime timestamp;

    public SyncStatisticsDTO(int totalProcessed, int created, int updated, OffsetDateTime timestamp) {
        this.totalProcessed = totalProcessed;
        this.created = created;
        this.updated = updated;
        this.timestamp = timestamp;
    }

    public int getTotalProcessed() {
        return totalProcessed;
    }

    public int getCreated() {
        return created;
    }

    public int getUpdated() {
        return updated;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }
}
