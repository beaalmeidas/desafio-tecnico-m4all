package com.printers.printerManagementSystem.service;

import com.printers.printerManagementSystem.model.Printer;
import com.printers.printerManagementSystem.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PrinterService {
    @Autowired
    private PrinterRepository printerRepository;

    public Page<Printer> getAllPrinters(Pageable pageable) {
        return printerRepository.findAll(pageable);
    }

    public Printer getPrinterById(UUID id) {
        return printerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Impressora não encontrada"));
    }

    public Printer createPrinter(Printer printer) {
        printer.setCreatedAt(OffsetDateTime.now());
        return printerRepository.save(printer);
    }

    public Printer updatePrinter(UUID id, Printer printerDetails) {
        Printer existing = getPrinterById(id);

        existing.setName(printerDetails.getName());
        existing.setModel(printerDetails.getModel());
        existing.setLocation(printerDetails.getLocation());
        existing.setStatus(printerDetails.getStatus());

        return printerRepository.save(existing);
    }

    public void deletePrinter(UUID id) {
        printerRepository.deleteById(id);
    }
}
