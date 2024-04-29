-- Hospital Staff

SELECT department, COUNT(*) AS patient_count FROM hospitalstaff JOIN patient ON hospitalstaff.hstaff_id = patient.hstaff_id GROUP BY department;

SELECT SUM(service_fee) AS total_fees FROM service;


SELECT AVG(amount) AS avg_billing_amount FROM invoice;


-- Doctor 
SELECT doctor_id, COUNT(*) AS prescription_count FROM prescription GROUP BY doctor_id;

SELECT doctor_id, MAX(record_count) AS max_records FROM (SELECT doctor_id, COUNT(*) AS record_count FROM medicalrecord GROUP BY doctor_id) AS record_counts Group by doctor_id;

SELECT AVG(service_fee) AS avg_service_fee FROM service WHERE service_id IN (SELECT service_id FROM includes WHERE invoice_no IN (SELECT invoice_no FROM prescription));


SELECT SUM(amount) AS total_revenue FROM invoice WHERE p_id IN (SELECT p_id FROM prescription);

SELECT jobrole, COUNT(*) AS staff_count FROM hospitalstaff GROUP BY jobrole;

SELECT department, MAX(age) AS max_age FROM hospitalstaff JOIN patient ON hospitalstaff.hstaff_id = patient.hstaff_id GROUP BY department;



SELECT doctor_id, MIN(prescription_count) AS min_prescriptions FROM (SELECT doctor_id, COUNT(*) AS prescription_count FROM prescription GROUP BY doctor_id) AS prescription_counts group by doctor_id;