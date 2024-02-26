CREATE TABLE decides (
    hstaff_id SERIAL,
    service_id SERIAL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) NOT NULL,
	modified_by VARCHAR(50) NOT NULL,
	PRIMARY KEY (hstaff_id, service_id),
	FOREIGN KEY (hstaff_id) REFERENCES hospitalstaff (hstaff_id),
    FOREIGN KEY (service_id) REFERENCES service (service_id) 
);


CREATE TABLE uploads (
    hstaff_id SERIAL,
    report_id SERIAL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) NOT NULL,
	modified_by VARCHAR(50) NOT NULL,
	PRIMARY KEY (hstaff_id, report_id),
	FOREIGN KEY (hstaff_id) REFERENCES hospitalstaff (hstaff_id),
    FOREIGN KEY (report_id) REFERENCES lab_report (report_id) 
);

CREATE TABLE medicalrecord (
    patient_id INTEGER,
    recorddate DATE,
	diagnosis varchar(100),
	doctor_id integer,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) NOT NULL,
	modified_by VARCHAR(50) NOT NULL,
	PRIMARY KEY (patient_id, recorddate),
	FOREIGN KEY (patient_id) REFERENCES patient (p_id),
	FOREIGN KEY (doctor_id) REFERENCES doctor (doctor_id)    
);

CREATE TABLE generates (
    hstaff_id INTEGER,
    invoice_no integer,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) NOT NULL,
	modified_by VARCHAR(50) NOT NULL,
	PRIMARY KEY (hstaff_id, invoice_no),
	FOREIGN KEY (hstaff_id) REFERENCES hospitalstaff (hstaff_id),
	FOREIGN KEY (invoice_no) REFERENCES invoice (invoice_no)    
);

CREATE TABLE includes (
    service_id INTEGER,
    invoice_no integer,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) NOT NULL,
	modified_by VARCHAR(50) NOT NULL,
	PRIMARY KEY (service_id,invoice_no),
	FOREIGN KEY (service_id) REFERENCES service (service_id),
	FOREIGN KEY (invoice_no) REFERENCES invoice (invoice_no)    
);
