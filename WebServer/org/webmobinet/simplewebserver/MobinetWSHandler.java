package org.webmobinet.simplewebserver;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;


class MobinetWSHandler implements HttpHandler {
	
	 public void handle(HttpExchange t) throws IOException {
		    System.out.println("MobinetWSHandler is handling your request");
		    String root = "./";
		    URI uri = t.getRequestURI();
		    File file = new File(root + uri.getPath()).getCanonicalFile();
		    String path = uri.getPath(); 
		    String xml = "<project name='SharedRobot Project' app='webmobinet' version='1'>";
		    
		    String allSpritesString = "";

		    for (Sprite sp : WebMobinetHttpServer.SpritesList)
		    {
		    	allSpritesString += sp.toString() + "\t";
		    	xml += "<sprite name='"+sp.getName()+"@"+sp.getSenderIp()+"' idx='2' x='"+(int) sp.getX()+"' y='"+(int) sp.getY()+"' heading='90' scale='1' rotation='1' draggable='false' costume='1' color='80,80,80' pen='tip' id='8'><costumes><list id='9'><item><costume name='clock' center-x='12' center-y='12' image='"+sp.getImage()+"' id='10'/></item></list></costumes><blocks></blocks><variables></variables><scripts></scripts></sprite>"
;		    }

		    xml += "</project>";
		    Headers h = t.getResponseHeaders();
		    h.add("Content-Type", "text/xml");
			h.add("Access-Control-Allow-Origin", "*");
		    //t.sendResponseHeaders( 200, allSpritesString.length());
		    t.sendResponseHeaders( 200, xml.length());
            OutputStream os = t.getResponseBody();
            os.write(xml.getBytes());
	        os.close();
//		    if (file.isDirectory()) {
//                // Check to see if there is an index file in the directory.
//                File indexFile = new File(file, "index.html");
//                if (indexFile.exists() && !indexFile.isDirectory()) {
//                    file = indexFile;
//                }else {
//                	
//                    // print directory listing
//                    if (!path.endsWith("/")) {
//                        path = path + "/";
//                    }
//                    File[] files = file.listFiles();
//                    String out ="";
//                    
//                    String title = "Index of " + path;
//                    
//                    out+="<html><head><title>" + title + "</title></head><body><h3>Index of " + path + "</h3><p>\n";
//                    for (int i = 0; i < files.length; i++) {
//                        file = files[i];
//                        String filename = file.getName();
//                        String description = "";
//                        if (file.isDirectory()) {
//                            description = "&lt;DIR&gt;";
//                        }
//                        out+="<a href=\"" + path + filename + "\">" + filename + "</a> " + description + "<br>\n";
//                    }
//                    out+="</p><hr><p>" + SimpleWebServer.VERSION + "</p></body><html>";
//                    t.sendResponseHeaders( 200, out.length());
//                    OutputStream os = t.getResponseBody();
//                    os.write(out.getBytes());
//      		        os.close();
//                }
//            
//		    
//		    }else if (!file.isFile()) {
//		    	System.out.println("!isFile" );
//		      // Object does not exist or is not a file: reject with 404 error.
//		      String response = "404 (Not Found)\n";
//		      t.sendResponseHeaders(404, response.length());
//		      OutputStream os = t.getResponseBody();
//		      os.write(response.getBytes());
//		      os.close();
//		    } else {
//		    	System.out.println("Else el koll" );
//		      // Object exists and is a file: accept with response code 200.
//		      t.sendResponseHeaders(200, 0);
//		      OutputStream os = t.getResponseBody();
//		      FileInputStream fs = new FileInputStream(file);
//		      final byte[] buffer = new byte[0x10000];
//		      int count = 0;
//		      while ((count = fs.read(buffer)) >= 0) {
//		        os.write(buffer,0,count);
//		      }
//		      fs.close();
//		      os.close();
//		    }
		  }
}