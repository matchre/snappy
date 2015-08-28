package org.webmobinet.simplewebserver;
import java.io.IOException;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

class GetHandler implements HttpHandler {
    public void handle(HttpExchange httpExchange) throws IOException {
      StringBuilder response = new StringBuilder();
      Map <String,String>parms = WebMobinetHttpServer.queryToMap(httpExchange.getRequestURI().getQuery());
      response.append("<html><body>");
      response.append("x : " + parms.get("x") + "<br/>");
      response.append("y : " + parms.get("y") + "<br/>");
      response.append("</body></html>");
      String spritename = parms.get("name") != null?parms.get("name"):"";
      Sprite sp=new Sprite(Float.parseFloat(parms.get("x")), Float.parseFloat(parms.get("y")), spritename, httpExchange.getRemoteAddress().getHostString(), "");
      WebMobinetHttpServer.addSprite(sp);
      WebMobinetHttpServer.writeResponse(httpExchange, response.toString());
    }
  }