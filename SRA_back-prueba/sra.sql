-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-03-2024 a las 21:41:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sra`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia`
--

CREATE TABLE `competencia` (
  `idCompetencia` int(100) NOT NULL,
  `nombreCompetencia` varchar(250) NOT NULL,
  `norma` varchar(500) NOT NULL,
  `codigoNorma` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competenciaresultadoaprendizaje`
--

CREATE TABLE `competenciaresultadoaprendizaje` (
  `idCompetenciaResultadoaprendizaje` int(100) NOT NULL,
  `idCompetencia` int(100) NOT NULL,
  `idResultadoAprendizaje` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etapaficha`
--

CREATE TABLE `etapaficha` (
  `idEtapaFicha` int(100) NOT NULL,
  `nomEtapa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etapaficha`
--

INSERT INTO `etapaficha` (`idEtapaFicha`, `nomEtapa`) VALUES
(1, 'Lectiva'),
(2, 'Productiva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha`
--

CREATE TABLE `ficha` (
  `idFicha` int(100) NOT NULL,
  `numeroFicha` varchar(10) NOT NULL,
  `duracionFicha` varchar(20) DEFAULT NULL,
  `fechaIniLectiva` varchar(12) DEFAULT NULL,
  `fechaIniProductiva` varchar(12) DEFAULT NULL,
  `fechaFinFormacion` varchar(12) DEFAULT NULL,
  `cantidadAprendices` varchar(3) DEFAULT NULL,
  `retiroAprendices` varchar(3) DEFAULT NULL,
  `aprendicesActivos` varchar(3) DEFAULT NULL,
  `idEtapaFicha` int(100) NOT NULL,
  `idModalidad` int(100) NOT NULL,
  `idTipoOferta` int(100) DEFAULT NULL,
  `idPrograma` int(100) NOT NULL,
  `idInstructorTecnico` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instructor`
--

CREATE TABLE `instructor` (
  `idInstructor` int(100) NOT NULL,
  `documentoInstructor` bigint(16) NOT NULL,
  `nombreInstructor` varchar(30) NOT NULL,
  `apellidoInstructor` varchar(30) NOT NULL,
  `telefonoInstructor` varchar(11) NOT NULL,
  `correoInstructor` varchar(55) NOT NULL,
  `idTipoDocumento` int(100) DEFAULT NULL,
  `idTipoInstructor` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

CREATE TABLE `modalidad` (
  `idModalidad` int(100) NOT NULL,
  `nomModalidad` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modalidad`
--

INSERT INTO `modalidad` (`idModalidad`, `nomModalidad`) VALUES
(1, 'A distancia'),
(2, 'Virtual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivelformacion`
--

CREATE TABLE `nivelformacion` (
  `idNivelFormacion` int(100) NOT NULL,
  `nomNivelFormacion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nivelformacion`
--

INSERT INTO `nivelformacion` (`idNivelFormacion`, `nomNivelFormacion`) VALUES
(1, 'Técnico'),
(2, 'Tecnólogo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa`
--

CREATE TABLE `programa` (
  `idPrograma` int(100) NOT NULL,
  `codigoPrograma` varchar(20) NOT NULL,
  `versionPrograma` varchar(3) NOT NULL,
  `nomPrograma` varchar(100) NOT NULL,
  `redConocimiento` varchar(100) NOT NULL,
  `codProyecto` int(20) DEFAULT NULL,
  `proyecto` varchar(100) DEFAULT NULL,
  `idNivelFormacion` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacion`
--

CREATE TABLE `programacion` (
  `idProgramacionCompetencia` int(100) NOT NULL,
  `fechaIniCompetencia` varchar(12) DEFAULT NULL,
  `fechaFinCompetencia` varchar(12) DEFAULT NULL,
  `idCompetencia` int(100) NOT NULL,
  `idInstructor` int(100) DEFAULT NULL,
  `idFicha` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacompetencia`
--

CREATE TABLE `programacompetencia` (
  `idProgramaCompetencia` int(100) NOT NULL,
  `idPrograma` int(100) NOT NULL,
  `idCompetencia` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultadoaprendizaje`
--

CREATE TABLE `resultadoaprendizaje` (
  `idResultadoAprendizaje` int(100) NOT NULL,
  `nomResultadoAprendizaje` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idTipoDocumento` int(100) NOT NULL,
  `nomTipoDocumento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`idTipoDocumento`, `nomTipoDocumento`) VALUES
(1, 'Tarjeta de Identidad'),
(2, 'Cédula de Ciudadanía'),
(3, 'Cédula de Extranjería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoinstructor`
--

CREATE TABLE `tipoinstructor` (
  `idTipoInstructor` int(100) NOT NULL,
  `nomTipoInstructor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipoinstructor`
--

INSERT INTO `tipoinstructor` (`idTipoInstructor`, `nomTipoInstructor`) VALUES
(1, 'Transversal'),
(2, 'Productiva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipooferta`
--

CREATE TABLE `tipooferta` (
  `idTipoOferta` int(100) NOT NULL,
  `nomTipoOferta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipooferta`
--

INSERT INTO `tipooferta` (`idTipoOferta`, `nomTipoOferta`) VALUES
(1, 'Abierta'),
(2, 'Cerrada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(100) NOT NULL,
  `nombreUsuario` varchar(60) NOT NULL,
  `correoUsuario` varchar(55) NOT NULL,
  `contrasenaUsuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `correoUsuario`, `contrasenaUsuario`) VALUES
(1, 'Administrador', 'sra10112003@gmail.com', '$2a$10$hDgrcRZ/UzTBo/0wwt7HmeAk46pgfF2ozm9RIvir4885LWhRnzdtu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `competencia`
--
ALTER TABLE `competencia`
  ADD PRIMARY KEY (`idCompetencia`);

--
-- Indices de la tabla `competenciaresultadoaprendizaje`
--
ALTER TABLE `competenciaresultadoaprendizaje`
  ADD PRIMARY KEY (`idCompetenciaResultadoaprendizaje`),
  ADD KEY `competenciaresultadoaprendizaje_ibfk_1` (`idCompetencia`),
  ADD KEY `competenciaresultadoaprendizaje_ibfk_2` (`idResultadoAprendizaje`);

--
-- Indices de la tabla `etapaficha`
--
ALTER TABLE `etapaficha`
  ADD PRIMARY KEY (`idEtapaFicha`);

--
-- Indices de la tabla `ficha`
--
ALTER TABLE `ficha`
  ADD PRIMARY KEY (`idFicha`),
  ADD KEY `idEtapaFicha` (`idEtapaFicha`),
  ADD KEY `idModalidad` (`idModalidad`),
  ADD KEY `idTipoOferta` (`idTipoOferta`),
  ADD KEY `idPrograma` (`idPrograma`),
  ADD KEY `idInstructorTecnico` (`idInstructorTecnico`);

--
-- Indices de la tabla `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`idInstructor`),
  ADD KEY `idTipoDocumento` (`idTipoDocumento`),
  ADD KEY `idTipoInstructor` (`idTipoInstructor`);

--
-- Indices de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  ADD PRIMARY KEY (`idModalidad`);

--
-- Indices de la tabla `nivelformacion`
--
ALTER TABLE `nivelformacion`
  ADD PRIMARY KEY (`idNivelFormacion`);

--
-- Indices de la tabla `programa`
--
ALTER TABLE `programa`
  ADD PRIMARY KEY (`idPrograma`),
  ADD KEY `idNivelFormacion` (`idNivelFormacion`);

--
-- Indices de la tabla `programacion`
--
ALTER TABLE `programacion`
  ADD PRIMARY KEY (`idProgramacionCompetencia`),
  ADD KEY `idCompetencia` (`idCompetencia`),
  ADD KEY `idInstructor` (`idInstructor`),
  ADD KEY `idFicha` (`idFicha`);

--
-- Indices de la tabla `programacompetencia`
--
ALTER TABLE `programacompetencia`
  ADD PRIMARY KEY (`idProgramaCompetencia`),
  ADD KEY `idPrograma` (`idPrograma`),
  ADD KEY `idCompetencia` (`idCompetencia`);

--
-- Indices de la tabla `resultadoaprendizaje`
--
ALTER TABLE `resultadoaprendizaje`
  ADD PRIMARY KEY (`idResultadoAprendizaje`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`idTipoDocumento`);

--
-- Indices de la tabla `tipoinstructor`
--
ALTER TABLE `tipoinstructor`
  ADD PRIMARY KEY (`idTipoInstructor`);

--
-- Indices de la tabla `tipooferta`
--
ALTER TABLE `tipooferta`
  ADD PRIMARY KEY (`idTipoOferta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `competencia`
--
ALTER TABLE `competencia`
  MODIFY `idCompetencia` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `competenciaresultadoaprendizaje`
--
ALTER TABLE `competenciaresultadoaprendizaje`
  MODIFY `idCompetenciaResultadoaprendizaje` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `etapaficha`
--
ALTER TABLE `etapaficha`
  MODIFY `idEtapaFicha` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ficha`
--
ALTER TABLE `ficha`
  MODIFY `idFicha` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `instructor`
--
ALTER TABLE `instructor`
  MODIFY `idInstructor` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  MODIFY `idModalidad` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `nivelformacion`
--
ALTER TABLE `nivelformacion`
  MODIFY `idNivelFormacion` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `programa`
--
ALTER TABLE `programa`
  MODIFY `idPrograma` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `programacion`
--
ALTER TABLE `programacion`
  MODIFY `idProgramacionCompetencia` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `programacompetencia`
--
ALTER TABLE `programacompetencia`
  MODIFY `idProgramaCompetencia` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resultadoaprendizaje`
--
ALTER TABLE `resultadoaprendizaje`
  MODIFY `idResultadoAprendizaje` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idTipoDocumento` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipoinstructor`
--
ALTER TABLE `tipoinstructor`
  MODIFY `idTipoInstructor` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipooferta`
--
ALTER TABLE `tipooferta`
  MODIFY `idTipoOferta` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `competenciaresultadoaprendizaje`
--
ALTER TABLE `competenciaresultadoaprendizaje`
  ADD CONSTRAINT `competenciaresultadoaprendizaje_ibfk_1` FOREIGN KEY (`idCompetencia`) REFERENCES `competencia` (`idCompetencia`) ON DELETE CASCADE,
  ADD CONSTRAINT `competenciaresultadoaprendizaje_ibfk_2` FOREIGN KEY (`idResultadoAprendizaje`) REFERENCES `resultadoaprendizaje` (`idResultadoAprendizaje`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ficha`
--
ALTER TABLE `ficha`
  ADD CONSTRAINT `ficha_ibfk_1` FOREIGN KEY (`idEtapaFicha`) REFERENCES `etapaficha` (`idEtapaFicha`) ON DELETE CASCADE,
  ADD CONSTRAINT `ficha_ibfk_2` FOREIGN KEY (`idModalidad`) REFERENCES `modalidad` (`idModalidad`) ON DELETE CASCADE,
  ADD CONSTRAINT `ficha_ibfk_3` FOREIGN KEY (`idTipoOferta`) REFERENCES `tipooferta` (`idTipoOferta`) ON DELETE CASCADE,
  ADD CONSTRAINT `ficha_ibfk_5` FOREIGN KEY (`idPrograma`) REFERENCES `programa` (`idPrograma`) ON DELETE CASCADE,
  ADD CONSTRAINT `ficha_ibfk_6` FOREIGN KEY (`idInstructorTecnico`) REFERENCES `instructor` (`idInstructor`) ON DELETE SET NULL;

--
-- Filtros para la tabla `instructor`
--
ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE CASCADE,
  ADD CONSTRAINT `instructor_ibfk_2` FOREIGN KEY (`idTipoInstructor`) REFERENCES `tipoinstructor` (`idTipoInstructor`) ON DELETE CASCADE;

--
-- Filtros para la tabla `programa`
--
ALTER TABLE `programa`
  ADD CONSTRAINT `programa_ibfk_1` FOREIGN KEY (`idNivelFormacion`) REFERENCES `nivelformacion` (`idNivelFormacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `programacion`
--
ALTER TABLE `programacion`
  ADD CONSTRAINT `programacion_ibfk_1` FOREIGN KEY (`idCompetencia`) REFERENCES `competencia` (`idCompetencia`) ON DELETE CASCADE,
  ADD CONSTRAINT `programacion_ibfk_2` FOREIGN KEY (`idInstructor`) REFERENCES `instructor` (`idInstructor`) ON DELETE SET NULL,
  ADD CONSTRAINT `programacion_ibfk_3` FOREIGN KEY (`idFicha`) REFERENCES `ficha` (`idFicha`) ON DELETE CASCADE;

--
-- Filtros para la tabla `programacompetencia`
--
ALTER TABLE `programacompetencia`
  ADD CONSTRAINT `programacompetencia_ibfk_1` FOREIGN KEY (`idPrograma`) REFERENCES `programa` (`idPrograma`) ON DELETE CASCADE,
  ADD CONSTRAINT `programacompetencia_ibfk_2` FOREIGN KEY (`idCompetencia`) REFERENCES `competencia` (`idCompetencia`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
