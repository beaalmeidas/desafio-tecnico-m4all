package com.printers.printerManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printers.printerManagementSystem.dto.SyncStatisticsDTO;
import com.printers.printerManagementSystem.service.PrinterSyncService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/sync")
public class SyncController {
    @Autowired
    private PrinterSyncService printerSyncService;

    @GetMapping("/statistics")
    public SyncStatisticsDTO getSyncStatistics() {
        return printerSyncService.getLastSyncStats();
    }
}