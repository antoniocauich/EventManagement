import { Event } from "../models/Event.js";

// Crear un nuevo evento (solo para usuarios autenticados)
export const createEvent = async (req, res) => {
  const { name, description, date, location, capacity } = req.body;
  try {
    const newEvent = await Event.create({
      name,
      description,
      date,
      location,
      capacity,
      userId: req.user.id, // userId viene del token JWT
    });
    res.status(201).json({ message: "Evento creado!!", Evento: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento", error });
  }
};

// Obtener todos los eventos
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos", error });
  }
};

// Obtener un evento por ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el evento", error });
  }
};

// Actualizar un evento (solo el creador o administrador puede hacerlo)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, capacity } = req.body;

  try {
    const event = await Event.findByPk(id);

    // Verificar si el evento existe
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Verificar si el usuario es el creador del evento o es administrador
    if (event.userId !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para actualizar este evento" });
    }

    // Actualizar el evento
    event.name = name;
    event.description = description;
    event.date = date;
    event.location = location;
    event.capacity = capacity;
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evento", error });
  }
};

// Eliminar un evento (solo el creador o administrador puede hacerlo)
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Verificar si el usuario es el creador del evento o administrador
    if (event.userId !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este evento" });
    }

    // Eliminar el evento
    await event.destroy();
    res.status(200).json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el evento", error });
  }
};
