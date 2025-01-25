-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "teacherId" UUID NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionSchedule" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "timeRange" TSRANGE,

    CONSTRAINT "SectionSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionSchedule" ADD CONSTRAINT "SectionSchedule_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Enable the btree_gist extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE OR REPLACE FUNCTION make_tsrange_1970(start_time TIME, end_time TIME)
RETURNS TSRANGE AS $$
BEGIN
    RETURN tsrange(
        ('1970-01-01 ' || start_time)::timestamp,
        ('1970-01-01 ' || end_time)::timestamp,
        '[)'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION set_default_data_column() RETURNS trigger AS $$
BEGIN
    NEW."timeRange" := make_tsrange_1970(NEW."startTime", NEW."endTime");
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Set default range value
CREATE TRIGGER set_data_column_trigger
BEFORE INSERT ON "SectionSchedule"
FOR EACH ROW
EXECUTE FUNCTION set_default_data_column();

CREATE OR REPLACE FUNCTION prevent_section_range_update() RETURNS trigger AS $$
BEGIN
    IF NEW."timeRange" IS DISTINCT FROM OLD."timeRange" THEN
        RAISE EXCEPTION 'start/end cannot be modified';
    ELSIF NEW."startTime" IS DISTINCT FROM OLD."startTime" THEN
        RAISE EXCEPTION 'start/end cannot be modified';
    ELSIF NEW."endTime" IS DISTINCT FROM OLD."endTime" THEN
        RAISE EXCEPTION 'start/end cannot be modified';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Prevent updating time ranges
CREATE TRIGGER prevent_data_column_update_trigger
BEFORE UPDATE ON "SectionSchedule"
FOR EACH ROW
EXECUTE FUNCTION prevent_section_range_update();
