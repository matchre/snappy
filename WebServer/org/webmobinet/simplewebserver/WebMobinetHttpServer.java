package org.webmobinet.simplewebserver;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Executors;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class WebMobinetHttpServer {

	public static List<Sprite> SpritesList = new ArrayList<Sprite>();;
	

	/**
	 * @return the spritesTab
	 */
	public List<Sprite> getSpritesTab() {
		return SpritesList;
	}

	/**
	 * @param spritesTab the spritesTab to set
	 */
	public static void addSprite(Sprite sprite) {
		SpritesList.add(sprite);
	}

	/**
	   * returns the url parameters in a map
	   * @param query
	   * @return map
	   */
	  public static Map<String, String> queryToMap(String query){
	    Map<String, String> result = new HashMap<String, String>();
	    for (String param : query.split("&")) {
	        String pair[] = param.split("=");
	        if (pair.length>1) {
	            result.put(pair[0], pair[1]);
	        }else{
	            result.put(pair[0], "");
	        }
	    }
	    return result;
	  } 
	  
	  public static void writeResponse(HttpExchange httpExchange, String response) throws IOException {
		    httpExchange.sendResponseHeaders(200, response.length());
		    OutputStream os = httpExchange.getResponseBody();
		    os.write(response.getBytes());
		    os.close();
		  }
	  
  public static void main(String[] args) throws IOException {
    InetSocketAddress addr = new InetSocketAddress(8080);
    HttpServer server = HttpServer.create(addr, 0);

    server.createContext("/", new MyHandler());
    server.createContext("/webservice", new MobinetWSHandler());
    server.createContext("/get", new GetHandler());
    server.setExecutor(Executors.newCachedThreadPool());
    server.start();
    System.out.println("Server is listening on port 8080 : v0.4" );
  }
}
class GetHandler implements HttpHandler {
    public void handle(HttpExchange httpExchange) throws IOException {
      StringBuilder response = new StringBuilder();
      Map <String,String>parms = WebMobinetHttpServer.queryToMap(httpExchange.getRequestURI().getQuery());
      response.append("<html><body>");
      response.append("x : " + parms.get("x") + "<br/>");
      response.append("y : " + parms.get("y") + "<br/>");
      response.append("</body></html>");
      Sprite sp=new Sprite(Float.parseFloat(parms.get("x")), Float.parseFloat(parms.get("y")), "new Sprite", "", "");
      WebMobinetHttpServer.addSprite(sp);
      WebMobinetHttpServer.writeResponse(httpExchange, response.toString());
    }
  }

class MyHandler implements HttpHandler {
	
	 public void handle(HttpExchange t) throws IOException {
		    String root = "./";
		    URI uri = t.getRequestURI();
		    File file = new File(root + uri.getPath()).getCanonicalFile();
		    String path = uri.getPath(); 
//		    if (!file.getPath().startsWith(root)) {
//		      // Suspected path traversal attack: reject with 403 error.
//		      String response = "403 (Forbidden)\n";
//		      t.sendResponseHeaders(403, response.length());
//		      OutputStream os = t.getResponseBody();
//		      os.write(response.getBytes());
//		      os.close();
//		    } else
		    if (file.isDirectory()) {
                // Check to see if there is an index file in the directory.
                File indexFile = new File(file, "index.html");
                if (indexFile.exists() && !indexFile.isDirectory()) {
                    file = indexFile;
                }else {
                	
                    // print directory listing
                    if (!path.endsWith("/")) {
                        path = path + "/";
                    }
                    File[] files = file.listFiles();
                    String out ="";
                    
                    String title = "Index of " + path;
                    
                    out+="<html><head><title>" + title + "</title></head><body><h3>Index of " + path + "</h3><p>\n";
                    for (int i = 0; i < files.length; i++) {
                        file = files[i];
                        String filename = file.getName();
                        String description = "";
                        if (file.isDirectory()) {
                            description = "&lt;DIR&gt;";
                        }
                        out+="<a href=\"" + path + filename + "\">" + filename + "</a> " + description + "<br>\n";
                    }
                    out+="</p><hr><p>" + SimpleWebServer.VERSION + "</p></body><html>";
                    t.sendResponseHeaders( 200, out.length());
                    OutputStream os = t.getResponseBody();
                    os.write(out.getBytes());
      		        os.close();
                }
            
		    
		    }else if (!file.isFile()) {
		    	System.out.println("!isFile" );
		      // Object does not exist or is not a file: reject with 404 error.
		      String response = "404 (Not Found)\n";
		      t.sendResponseHeaders(404, response.length());
		      OutputStream os = t.getResponseBody();
		      os.write(response.getBytes());
		      os.close();
		    } else {
		    	System.out.println("Else el koll" );
		      // Object exists and is a file: accept with response code 200.
		      t.sendResponseHeaders(200, 0);
		      OutputStream os = t.getResponseBody();
		      FileInputStream fs = new FileInputStream(file);
		      final byte[] buffer = new byte[0x10000];
		      int count = 0;
		      while ((count = fs.read(buffer)) >= 0) {
		        os.write(buffer,0,count);
		      }
		      fs.close();
		      os.close();
		    }
		  }
	
//  public void handle(HttpExchange exchange) throws IOException {
//    String requestMethod = exchange.getRequestMethod();
//    if (requestMethod.equalsIgnoreCase("GET")) {
//      Headers responseHeaders = exchange.getResponseHeaders();
//      responseHeaders.set("Content-Type", "text/plain");
//      exchange.sendResponseHeaders(200, 0);
//
//      OutputStream responseBody = exchange.getResponseBody();
//      Headers requestHeaders = exchange.getRequestHeaders();
//      Set<String> keySet = requestHeaders.keySet();
//      Iterator<String> iter = keySet.iterator();
//      while (iter.hasNext()) {
//        String key = iter.next();
//        List values = requestHeaders.get(key);
//        String s = key + " = " + values.toString() + "\n";
//        responseBody.write(s.getBytes());
//      }
//      responseBody.close();
//    }
//  }
}
