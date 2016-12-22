package grails3withleafletjsandd3

class BootStrap {

    def init = { servletContext ->
        // Replace with file upload
        try {
            def filePath = 'data/cc-maps-data-set.csv'
            def csv = new File("$filePath")

            csv.eachLine { csvLine ->
                def line = csvLine.split(',')
                new Agents(
                        name: line[0],
                        latitude: line[1],
                        longitude: line[2],
                        age: line[3],
                        gender: line[4]
                ).save(failOnError: true)
            }
        } catch (Exception e) {
            println e
        }
    }
    def destroy = {
    }
}
