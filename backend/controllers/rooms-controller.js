const RoomDto = require("../dtos/room-dto")
const roomService = require("../services/room-service")

class RoomController {
    async create(req, res) {
        const {topic, roomType} = req.body

        if (!topic || !roomType) {
            return res
                .status(400)
                .json({message:'All fields required'})
        }

        const room = await roomService.create({
            topic,
            roomType,
            ownerId: req.user._id
        })

        return res.json(new RoomDto(room))
    }
}

module.exports = new RoomController()