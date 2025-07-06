package com.printers.printerManagementSystem.repository;

import com.printers.printerManagementSystem.model.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PrinterRepository extends JpaRepository<Printer, UUID> {
}
