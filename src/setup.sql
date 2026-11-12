
-- ========================================
-- CSE 340 - Database Setup
-- ========================================
-- This script creates the database tables
-- and inserts sample data for the application.
--
-- Execution order:
-- 1. Create organization table
-- 2. Insert sample organizations
-- 3. Create project table
-- 4. Insert sample service projects
-- ========================================


-- ========================================
-- 1. Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- 2. Insert Sample Organizations
-- ========================================
INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders',
 'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
 'info@brightfuturebuilders.org',
 'brightfuture-logo.png'),

('GreenHarvest Growers',
 'An urban farming collective promoting food sustainability and education in local neighborhoods.',
 'contact@greenharvest.org',
 'greenharvest-logo.png'),

('UnityServe Volunteers',
 'A volunteer coordination group supporting local charities and service initiatives.',
 'hello@unityserve.org',
 'unityserve-logo.png');


-- ========================================
-- 3. Service Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);


-- ========================================
-- 4. Insert Sample Service Projects
-- ========================================
INSERT INTO project
(organization_id, title, description, location, date)
VALUES

-- BrightFuture Builders
(1, 'Community Center Renovation',
 'Renovate a local community center.',
 'Quito, Ecuador', '2026-12-05'),

(1, 'School Playground Construction',
 'Build a safe playground for children.',
 'Ambato, Ecuador', '2026-12-12'),

(1, 'Affordable Housing Project',
 'Support construction of affordable homes.',
 'Latacunga, Ecuador', '2027-01-09'),

(1, 'Public Library Restoration',
 'Repair and improve a neighborhood library.',
 'Riobamba, Ecuador', '2027-01-16'),

(1, 'Community Park Improvements',
 'Restore public park facilities.',
 'Quito, Ecuador', '2027-01-23'),


-- GreenHarvest Growers
(2, 'Urban Garden Installation',
 'Create a neighborhood vegetable garden.',
 'Quito, Ecuador', '2026-12-06'),

(2, 'Community Composting Workshop',
 'Teach sustainable composting practices.',
 'Cuenca, Ecuador', '2026-12-13'),

(2, 'School Garden Program',
 'Help students grow fresh vegetables.',
 'Ambato, Ecuador', '2027-01-10'),

(2, 'Tree Planting Day',
 'Plant native trees in community spaces.',
 'Quito, Ecuador', '2027-01-17'),

(2, 'Food Sustainability Fair',
 'Promote sustainable local agriculture.',
 'Ibarra, Ecuador', '2027-01-24'),


-- UnityServe Volunteers
(3, 'Food Donation Drive',
 'Collect food for families in need.',
 'Quito, Ecuador', '2026-12-07'),

(3, 'Senior Community Support',
 'Assist older adults with daily activities.',
 'Cuenca, Ecuador', '2026-12-14'),

(3, 'Clothing Collection Campaign',
 'Collect clothing for local charities.',
 'Ambato, Ecuador', '2027-01-11'),

(3, 'Neighborhood Cleanup',
 'Organize volunteers to clean public spaces.',
 'Guayaquil, Ecuador', '2027-01-18'),

(3, 'Volunteer Training Day',
 'Prepare volunteers for community initiatives.',
 'Quito, Ecuador', '2027-01-25');
