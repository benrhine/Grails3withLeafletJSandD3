# Grails3withLeafletJSandD3

Technologies Used:
 - Grails 3.2.3 with full use of asset-pipeline
 - Gradle
 - jQuery
 - LeafletJS
 - MakiMarkers
 - D3
 - Bootstrap

This application is showcasing a Grails 3 application which is leveraging LeafletJS and MakiMarkers to map Male and Female agents onto a map. Additionally this application shows how to correctly map grails variables into a a java script context
```
<g:javascript>
    <g:applyCodec encodeAs="none">
        var data = ${jsonData};
    </g:applyCodec>
</g:javascript>
```
Next step is I am going to do some visualizations with D3.js in order to learn some more of its functionality.
