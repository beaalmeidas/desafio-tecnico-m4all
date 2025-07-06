package com.printers.printer_management_system.repository;

import com.seuusuario.printermanagement.model.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface PrinterRepository extends JpaRepository<Printer, UUID> {
}
