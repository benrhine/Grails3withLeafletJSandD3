package grails3withleafletjsandd3

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AgentsController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        final agentsList = Agents.list() as JSON
        respond Agents.list(params), model:[agentsCount: Agents.count(), jsonData: agentsList]
    }

    def show(Agents agents) {
        respond agents
    }

    def create() {
        respond new Agents(params)
    }

    @Transactional
    def save(Agents agents) {
        if (agents == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (agents.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond agents.errors, view:'create'
            return
        }

        agents.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'agents.label', default: 'Agents'), agents.id])
                redirect agents
            }
            '*' { respond agents, [status: CREATED] }
        }
    }

    def edit(Agents agents) {
        respond agents
    }

    @Transactional
    def update(Agents agents) {
        if (agents == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (agents.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond agents.errors, view:'edit'
            return
        }

        agents.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'agents.label', default: 'Agents'), agents.id])
                redirect agents
            }
            '*'{ respond agents, [status: OK] }
        }
    }

    @Transactional
    def delete(Agents agents) {

        if (agents == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        agents.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'agents.label', default: 'Agents'), agents.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'agents.label', default: 'Agents'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
