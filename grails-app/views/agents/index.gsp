<!DOCTYPE html>
<html>

    <head>
        <meta name="layout" content="leaflet" />
        <g:set var="entityName" value="${message(code: 'agents.label', default: 'Agents')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <a href="#list-agents" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
        <div class="nav" role="navigation">
            <ul>
                <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
                <li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
                <li><a href='#' class='active' id='show-all' onclick="AgentUtils.showAll()">All</a></li>
                <li><a href='#' id='clear-all' onclick="AgentUtils.removeAll()">Clear</a></li>
                <li><a href='#' id='add-male' onclick="AgentUtils.addMaleAgents()">Add Male</a></li>
                <li><a href='#' id='remove-male' onclick="AgentUtils.removeMaleAgents()">Remove Male</a></li>
                <li><a href='#' id='add-female' onclick="AgentUtils.addFemaleAgents()">Add Female</a></li>
                <li><a href='#' id='remove-female' onclick="AgentUtils.removeFemaleAgents()">Remove Female</a></li>
                <li>Age: <input type="text" id="agentAge" maxlength="2"/></li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-8">
                <div id="agentsMap" style="height: 350px;"></div>
            </div>
        </div>
        <br>
        <div id="list-agents" class="content scaffold-list" role="main">
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
                <div class="message" role="status">${flash.message}</div>
            </g:if>
            <f:table collection="${agentsList}" />

            <div class="pagination">
                <g:paginate total="${agentsCount ?: 0}" />
            </div>
        </div>

        %{-- This is the magic piece to getting a grails variable converted to a javascript variable --}%
        %{-- http://aruizca.com/how-to-render-json-properly-without-escaping-quotes-inside-a-gsp-script-tag/ --}%
        <g:javascript>
            <g:applyCodec encodeAs="none">
                var dataTest = ${jsonData};
            </g:applyCodec>
        </g:javascript>

    </body>
</html>