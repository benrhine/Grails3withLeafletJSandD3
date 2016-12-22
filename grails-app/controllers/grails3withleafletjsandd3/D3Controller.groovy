package grails3withleafletjsandd3

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional(readOnly = true)
class D3Controller {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        final agentsList = Agents.list() as JSON
        respond Agents.list(params), model:[agentsCount: Agents.count(), jsonData: agentsList]
    }
}
