package com.printers.printer_management_system.service;

import com.printers.printer_management_system.model.Printer;
import com.printers.printer_management_system.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class PrinterService {
    @Autowired
    private PrinterRepository printerRepository;

    public List<Printer> getAllPrinters() {
        return printerRepository.findAll();
    }

    public Printer getPrinterById(UUID id) {
        return printerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Impressora não encontrada"));
    }

    public Printer createPrinter(Printer printer) {
        return printerRepository.save(printer);
    }

    public Printer updatePrinter(UUID id, Printer printerDetails) {
        Printer existing = getPrinterById(id);

        existing.setNome(printerDetails.getNome());
        existing.setModelo(printerDetails.getModelo());
        existing.setLocalizacao(printerDetails.getLocalizacao());
        existing.setStatus(printerDetails.getStatus());

        return printerRepository.save(existing);
    }

    public void deletePrinter(UUID id) {
        printerRepository.deleteById(id);
    }
}
