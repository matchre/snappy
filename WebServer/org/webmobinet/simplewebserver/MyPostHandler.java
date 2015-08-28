package org.webmobinet.simplewebserver;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;


class MyPostHandler implements HttpHandler {
	 
	 public void handle(HttpExchange t) throws IOException {
		// determine encoding
		 Headers reqHeaders = t.getRequestHeaders();
		 String contentType = reqHeaders.getFirst("Content-Type");
		 String encoding = "ISO-8859-1";
		 if (contentType != null) {
		     Map<String,String> parms = ValueParser.parse(contentType);
		     if (parms.containsKey("charset")) {
		         encoding = parms.get("charset");
		     }
		 }
		 // read the query string from the request body
		 String qry;
		 InputStream in = t.getRequestBody();
		 try {
		     ByteArrayOutputStream out = new ByteArrayOutputStream();
		     byte buf[] = new byte[4096];
		     for (int n = in.read(buf); n > 0; n = in.read(buf)) {
		         out.write(buf, 0, n);
		     }
		     qry = new String(out.toByteArray(), encoding);
		 } finally {
		     in.close();
		 }
		 // parse the query
		 Map<String,List<String>> parms = new HashMap<String,List<String>>();
		 String defs[] = qry.split("[&]");
		 for (String def: defs) {
		     int ix = def.indexOf('=');
		     String name;
		     String value;
		     if (ix < 0) {
		         name = URLDecoder.decode(def, encoding);
		         value = "";
		     } else {
		         name = URLDecoder.decode(def.substring(0, ix), encoding);
		         value = URLDecoder.decode(def.substring(ix+1), encoding);
		     }
		     List<String> list = parms.get(name);
		     if (list == null) {
		         list = new ArrayList<String>();
		         parms.put(name, list);
		     }
		     list.add(value);
		 }
		  }
}