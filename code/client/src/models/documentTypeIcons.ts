import L from "leaflet"
import DesignDocumentIcon from "../assets/icons/Design document icon.svg"
import InformativeDocumentIcon from "../assets/icons/Informative document icon.svg"
import PrescriptiveDocumentIcon from "../assets/icons/Prescriptive document icon.svg"
import TechnicalDocumentIcon from "../assets/icons/Technical document icon.svg"
import AgreementIcon from "../assets/icons/Agreement icon.svg"
import ConflictIcon from "../assets/icons/Conflict icon.svg"
import ConsultationIcon from "../assets/icons/Consultation icon.svg"
import ActionIcon from "../assets/icons/Action icon.svg"

const designDocumentIcon = new L.Icon({
    iconUrl: DesignDocumentIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const informativeDocumentIcon = new L.Icon({
    iconUrl: InformativeDocumentIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const prescriptiveDocumentIcon = new L.Icon({
    iconUrl: PrescriptiveDocumentIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const technicalDocumentIcon = new L.Icon({
    iconUrl: TechnicalDocumentIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const agreementIcon = new L.Icon({
    iconUrl: AgreementIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const conflictIcon = new L.Icon({
    iconUrl: ConflictIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const consultationIcon = new L.Icon({
    iconUrl: ConsultationIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const actionIcon = new L.Icon({
    iconUrl: ActionIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

const icons = new Map<string, L.Icon>()
icons.set("Design document", designDocumentIcon)
icons.set("Informative document",informativeDocumentIcon)
icons.set("Prescriptive document",prescriptiveDocumentIcon)
icons.set("Technical document",technicalDocumentIcon)
icons.set("Agreement",agreementIcon)
icons.set("Conflict",conflictIcon)
icons.set("Consultation",consultationIcon)
icons.set("Action",actionIcon)

export default icons