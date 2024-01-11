CREATE
OR REPLACE VIEW employee_details AS
SELECT
    s.id,
    s.name,
    s.firstname,
    s.lastname,
    s.image,
    s.salary,
    s.ayto_url,
    s.cv,
    s.assets,
    s.contact,
    s.linkedin_url,
    s.wikipedia_url,
    n.id AS position_id,
    n.employee_id,
    n.position,
    n.url,
    n.obs,
    n.type,
    p_ext.id AS position_ext_id,
    p_ext.position AS position_ext,
    p_ext.salary AS position_ext_salary,
    p_ext.obs AS position_ext_obs,
    p_ext.url AS position_ext_url,
    r.id AS record_id,
    r.date,
    r.name AS record_name,
    r.firstname AS record_firstname,
    r.lastname AS record_lastname,
    r.image AS record_image,
    r.salary AS record_salary,
    r.obs AS record_obs,
    r.wikipedia_url AS record_wikipedia_url,
    r.linkedin_url AS record_linkedin_url
FROM
    employees s
    INNER JOIN positions n ON n.employee_id = s.id
    LEFT JOIN positions_external p_ext ON p_ext.employee_id = s.id
    LEFT JOIN records r ON r.id = s.id



CREATE OR REPLACE VIEW licitacion_news AS
SELECT
  l.*,
  n.id AS news_id,
  n.created_at AS news_created_at,
  n.date AS news_date,
  n.media AS news_media,
  n.title AS news_title,
  n.url AS news_url
FROM
  licitaciones l
  LEFT JOIN news n ON n.licitacion_id = l.id
WHERE
 l.id = '6482b989-9afa-4551-85b4-52f157d8624d';



 insert into "depende-eo" values 
(2, 1);



SELECT * FROM entidades_organizativas WHERE nombre LIKE '%atención %';


-- =================================================================================================
create view
  public.datos_organigrama as
select
  deo.id,
  deo."parentId",
  eo.nombre as nombre_entidad,
  peo.id_puesto,
  p.nombre as nombre_puesto,
  p.rpt_id,
  p.situacion as situacion_puesto
from
  "depende-eo" deo
  left join entidades_organizativas eo on deo.id = eo.id
  left join "puesto-eo" peo on deo.id = peo.id_uo
  left join puestos p on peo.id_puesto = p.id;
-- =================================================================================================
