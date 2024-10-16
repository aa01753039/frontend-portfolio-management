// filter component.tsx
import { Box, Button, Flex, Spacer, Wrap } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { MdOutlineFilterAltOff } from "react-icons/md";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import useReclutadores from "../Rys/Reclutadores";

type OptionType = {
  value: string;
  label: string;
};

export type FilterFormValues = {
  anio: OptionType[];
  mes: OptionType[];
  dir_corp: OptionType[];
  id_reclutador: OptionType[];
  ubi_ceco: OptionType[];
  gpo_per: OptionType[];
  estatus_rys: OptionType[];
  nivel1: OptionType[];
  nivel2: OptionType[];
  nivel3: OptionType[];
};

const FilterComponent = ({
  onFilter,
}: {
  onFilter: (data: FilterFormValues) => void;
}) => {
  const { data: reclutadores } = useReclutadores();

  const reclutadoresOptions: OptionType[] =
    reclutadores?.data.map((reclutador) => ({
      value: reclutador.id,
      label: reclutador.full_name || "Desconocido", // Provide a default value for label
    })) ?? [];

  const yearOptions: OptionType[] = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    // Add more years as needed
  ];

  const monthOptions: OptionType[] = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
    // Add more months as needed
  ];

  const dirCorpOptions: OptionType[] = [
    { value: "LOGÍSTICA", label: "Logística" },
    { value: "PLAN", label: "PLAN" },
    { value: "JURÍDICO", label: "Jurídico" },
    { value: "LIVERPOOL", label: "Liverpool" },
    { value: "NEG. FIN.", label: "Negocios Financieros" },
    { value: "FINANZAS", label: "Finanzas" },
    { value: "AUDITORÍA", label: "Auditoría" },
    { value: "CAPITAL HUMANO", label: "Capital Humano" },
    { value: "BOUTIQUES", label: "Boutiques" },
    { value: "INMOBILIARIA", label: "Inmobiliaria" },
    { value: "DIP", label: "DIP" },
    { value: "CCOE", label: "CCOE" },
    { value: "DIGITAL", label: "Digital" },
    { value: "TRANSFORMACIÓN E INNOVACIÓN", label: "TI" },
    // Add more options as needed
  ];
  const ubiCecoOptions: OptionType[] = [
    { value: "0691", label: "Oficinas UVL" },
    { value: "0805", label: "Oficina Shangai" },
    { value: "0487", label: "Oficinas Mario Pani" },
    { value: "0900", label: "Comisariato" },
    { value: "0395", label: "Oficinas Quad" },
    { value: "0694", label: "Oficinas Liverpool Santa Fe" },
  ];

  const gpoPerOptions: OptionType[] = [
    { value: "Planta No Sind.", label: "Planta No Sind." },
    { value: "Vía Planta No Sind.", label: " Vía Planta No Sind." },
    { value: "Vía Planta", label: " Vía Planta" },
    { value: "Eventual No Sind.", label: "Eventual No Sind." },
    { value: "Externos", label: "Externos" },
  ];

  const estatusRysOptions: OptionType[] = [
    { value: "Acuerdo de servicio", label: "Acuerdo de servicio" },
    { value: "Publicación de vacante", label: "Publicación de vacante" },
    { value: "Búsqueda de candidatos", label: "Búsqueda de candidatos" },
    { value: "Entrevistas RYS", label: "Entrevistas RYS" },
    { value: "En pruebas Psicométricas", label: "En pruebas Psicométricas" },
    { value: "Entrevista Cliente", label: "Entrevista Cliente" },
    { value: "En Prueba técnica", label: "En Prueba técnica" },
    { value: "Panel", label: "Panel" },
    { value: "Oferta económica", label: "Oferta económica" },
    {
      value: "Entrega de documentos y firma de propuesta",
      label: "Entrega de documentos y firma de propuesta",
    },
    { value: "Contratad@", label: "Contratad@" },
    { value: "Stand By", label: "Stand By" },
    { value: "Cobertura Interna", label: "Cobertura Interna" },
    { value: "Cancelada", label: "Cancelada" },
    { value: "Reinicio", label: "Reinicio" },
    // Add more options as needed
  ];

  const nivel1Options: OptionType[] = [
    { value: "Liverpool", label: "Liverpool" },
    { value: "Logística", label: "Logística" },
    { value: "Boutiques", label: "Boutiques" },
    { value: "Servicios Compartidos", label: "Servicios Compartidos" },
    { value: "Sfera", label: "Sfera" },
    { value: "Inmobiliaria", label: "Inmobiliaria" },
    { value: "Suburbia", label: "Suburbia" },
    { value: "Adcones y CC Externos", label: "Adcones y CC Externos" },
    { value: "Financiera", label: "Financiera" },
    { value: "IFRS16", label: "IFRS16" },
    { value: "Negocios Financieros", label: "Negocios Financieros" },
  ];

  const nivel2Options: OptionType[] = [
    { value: "Operaciones", label: "Operaciones" },
    { value: "Logística", label: "Logística" },
    { value: "Boutiques", label: "Boutiques" },
    { value: "D Corp", label: "D Corp" },
    { value: "Sfera", label: "Sfera" },
    { value: "Softline", label: "Softline" },
    { value: "Inmobiliaria", label: "Inmobiliaria" },
    { value: "Suburbia", label: "Suburbia" },
    { value: "Hardline", label: "Hardline" },
    { value: "Suburbia Inmobiliaria", label: "Suburbia Inmobiliaria" },
    { value: "Inmob Ope.", label: "Inmob Ope." },
    { value: "Inmob CC Ext", label: "Inmob CC Ext" },
    { value: "Auditoría", label: "Auditoría" },
    { value: "Jurídico", label: "Jurídico" },
    { value: "FyA", label: "FyA" },
    { value: "Desarrollo Organizacional", label: "Desarrollo Organizacional" },
    { value: "Integ. de Neg.", label: "Integ. de Neg." },
    { value: "Obras", label: "Obras" },
    { value: "IFRS16", label: "IFRS16" },
    { value: "Neg. Fin.", label: "Neg. Fin." },
    { value: "Digital", label: "Digital" },
    { value: "Suburbia Neg. Fin.", label: "Suburbia Neg. Fin." },
    { value: "Marketing", label: "Marketing" },
    { value: "Reserva", label: "Reserva" },
    { value: "Informática", label: "Informática" },
    {
      value: "Transformación e Innovación",
      label: "Transformación e Innovación",
    },
  ];

  const nivel3Options: OptionType[] = [
    { value: "Operaciones", label: "Operaciones" },
    { value: "Restaurante", label: "Restaurante" },
    { value: "Infraestructura", label: "Infraestructura" },
    { value: "Transporte", label: "Transporte" },
    { value: "Softline", label: "Softline" },
    { value: "Cosméticos", label: "Cosméticos" },
    { value: "Hardline", label: "Hardline" },
    { value: "Dir. General", label: "Dir. General" },
    { value: "Sfera", label: "Sfera" },
    { value: "Lab. Óptica", label: "Lab. Óptica" },
    { value: "Inmobiliaria", label: "Inmobiliaria" },
    { value: "Sub. Operaciones", label: "Sub. Operaciones" },
    { value: "Sub. Inmobiliaria", label: "Sub. Inmobiliaria" },
    { value: "Adcones", label: "Adcones" },
    { value: "Sub. Corporativo", label: "Sub. Corporativo" },
    { value: "Inmobiliaria CC Ext", label: "Inmobiliaria CC Ext" },
    { value: "Dir. Comercial", label: "Dir. Comercial" },
    { value: "Corporativo", label: "Corporativo" },
    { value: "Auditoría", label: "Auditoría" },
    { value: "Jurídico", label: "Jurídico" },
    { value: "Tesorería", label: "Tesorería" },
    { value: "Desempeño y Servicio", label: "Desempeño y Servicio" },
    { value: "Proyectos Comerciales", label: "Proyectos Comerciales" },
    { value: "Integ. de Negocios", label: "Integ. de Negocios" },
    { value: "Diseño CC", label: "Diseño CC" },
    { value: "Planeación de Almacenes", label: "Planeación de Almacenes" },
    { value: "Construcción", label: "Construcción" },
    { value: "Ingenierías", label: "Ingenierías" },
    { value: "Expansión", label: "Expansión" },
    {
      value: "Ingenierías y Admnistración",
      label: "Ingenierías y Admnistración",
    },
    { value: "Contraloría Corp.", label: "Contraloría Corp." },
    { value: "Fiscal", label: "Fiscal" },
    { value: "Contraloría Ope.", label: "Contraloría Ope." },
    { value: "Seguridad", label: "Seguridad" },
    { value: "Liverpool", label: "Liverpool" },
    { value: "Boutiques", label: "Boutiques" },
    { value: "Dilisa", label: "Dilisa" },
    { value: "LPC", label: "LPC" },
    { value: "CCoE", label: "CCoE" },
    { value: "Finanzas", label: "Finanzas" },
    { value: "Suburbia", label: "Suburbia" },
    { value: "VAD Liverpool", label: "VAD Liverpool" },
    { value: "Informática", label: "Informática" },
    { value: "Seguros", label: "Seguros" },
    { value: "Sub. Cerrada", label: "Sub. Cerrada" },
    { value: "Suburbia VAD", label: "Suburbia VAD" },
    { value: "Sub. Abierta", label: "Sub. Abierta" },
    { value: "Publicidad", label: "Publicidad" },
    { value: "VAD WSI", label: "VAD WSI" },
    { value: "VAD Indirectos", label: "VAD Indirectos" },
    { value: "RRPP", label: "RRPP" },
    { value: "PV y Display", label: "PV y Display" },
    { value: "DIM", label: "DIM" },
    { value: "Soporte Digital", label: "Soporte Digital" },
    { value: "Proyectos VAD", label: "Proyectos VAD" },
    { value: "Prev de Perd", label: "Prev de Perd" },
    { value: "CAT", label: "CAT" },
    { value: "Abastecimientos", label: "Abastecimientos" },
    { value: "Mantenimiento", label: "Mantenimiento" },
    { value: "Reserva", label: "Reserva" },
    { value: "Comunicacion y Cultura", label: "Comunicacion y Cultura" },
    {
      value: "Administracion y Beneficios",
      label: "Administracion y Beneficios",
    },
    {
      value: "Recuperación Incapacidades",
      label: "Recuperación Incapacidades",
    },
    { value: "RH Staff", label: "RH Staff" },
    { value: "Direccion DO", label: "Direccion DO" },
    { value: "Relaciones Laborales", label: "Relaciones Laborales" },
    { value: "Aprendizaje y Desarrollo", label: "Aprendizaje y Desarrollo" },
    { value: "RH Liverpool", label: "RH Liverpool" },
    { value: "Proyectos", label: "Proyectos" },
    { value: "Experiencia", label: "Experiencia" },
    { value: "Planeación", label: "Planeación" },
    { value: "Almacenaje", label: "Almacenaje" },
    { value: "PLAN", label: "PLAN" },
    { value: "RH Logistica", label: "RH Logistica" },
    { value: "Agencia de Viajes", label: "Agencia de Viajes" },
    { value: "Vtas Institucionales", label: "Vtas Institucionales" },
    { value: "Mesa de Regalos", label: "Mesa de Regalos" },
    { value: "Catalogación", label: "Catalogación" },
    { value: "Sub. Seguros", label: "Sub. Seguros" },
    { value: "Reservaciones", label: "Reservaciones" },
    { value: "Muebles", label: "Muebles" },
    { value: "Caballeros", label: "Caballeros" },
    { value: "Hogar", label: "Hogar" },
    { value: "Infantiles", label: "Infantiles" },
    { value: "Damas", label: "Damas" },
    { value: "Multimedia", label: "Multimedia" },
    { value: "Deportes", label: "Deportes" },
    { value: "MP", label: "MP" },
    { value: "DPAC", label: "DPAC" },
    { value: "Diseño MP", label: "Diseño MP" },
    { value: "Tendencias Moda", label: "Tendencias Moda" },
    { value: "Importaciones", label: "Importaciones" },
    {
      value: "Ingenierías y Administración",
      label: "Ingenierías y Administración",
    },
    { value: "Sub. Departamental", label: "Sub. Departamental" },
    { value: "Sub. Visa", label: "Sub. Visa" },
    { value: "CX", label: "CX" },
    { value: "Operaciones Digital", label: "Operaciones Digital" },
    { value: "Comunicación y Cultura", label: "Comunicación y Cultura" },
    {
      value: "Administración y Beneficios",
      label: "Administración y Beneficios",
    },
    { value: "Dirección DO", label: "Dirección DO" },
    { value: "RH Logística", label: "RH Logística" },
    { value: "Tecnología Digital", label: "Tecnología Digital" },
    {
      value: "Transformación e Innovación",
      label: "Transformación e Innovación",
    },
    { value: "Omnicanal", label: "Omnicanal" },
  ];

  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: {
      anio: [],
      mes: [],
      dir_corp: [],
      id_reclutador: [],
      ubi_ceco: [],
      gpo_per: [],
      estatus_rys: [],
      nivel1: [],
      nivel2: [],
      nivel3: [],
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    // select only the values from the selected options for each field in the form
    // for data.anio["value"], data.mes["value"], etc.
    // this will be the data that will be passed to the parent
    
    onFilter(data);
  };

  const handleReset = () => {
    reset();
    onFilter({
      anio: [],
      mes: [],
      dir_corp: [],
      id_reclutador: [],
      ubi_ceco: [],
      gpo_per: [],
      estatus_rys: [],
      nivel1: [],
      nivel2: [],
      nivel3: [],
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} mb={4}>
      <Wrap spacing={4} justify="center">
        <Controller
          name="anio"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={yearOptions}
              isMulti
              placeholder="Año"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />
        <Controller
          name="mes"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={monthOptions}
              isMulti
              placeholder="Mes"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />
        <Controller
          name="dir_corp"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={dirCorpOptions}
              isMulti
              placeholder="Negocio"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />

        <Controller
          name="ubi_ceco"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={ubiCecoOptions}
              isMulti
              placeholder="Ubicación"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />
        <Controller
          name="nivel1"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={nivel1Options}
              isMulti
              placeholder="Nivel 1"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />
        <Controller
          name="nivel2"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={nivel2Options}
              isMulti
              placeholder="Nivel 2"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />

        <Controller
          name="nivel3"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={nivel3Options}
              isMulti
              placeholder="Nivel 3"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />
        <Controller
          name="gpo_per"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={gpoPerOptions}
              isMulti
              placeholder="Grupo de personal"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />
        <Controller
          name="id_reclutador"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={reclutadoresOptions}
              isMulti
              placeholder="Reclutador"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
              isLoading={!reclutadores}
            />
          )}
        />

        <Controller
          name="estatus_rys"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={estatusRysOptions}
              isMulti
              placeholder="Estatus"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions ?? [])
              }
              value={field.value}
            />
          )}
        />

        <Button leftIcon={<FiFilter />} type="submit" colorScheme="deepGray">
          Filtrar
        </Button>
        <Spacer />
        <Flex justify="space-between">
          <Button
            leftIcon={<MdOutlineFilterAltOff />}
            onClick={handleReset}
            colorScheme="gray"
          >
            Resetear
          </Button>
        </Flex>
      </Wrap>
    </Box>
  );
};

export default FilterComponent;
