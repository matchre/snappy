
package org.webmobinet.simplewebserver;
import java.io.PrintWriter;
import java.io.File;
import java.io.*;
import java.net.*;
import java.util.*;
import com.sun.net.httpserver.*;

class MyHttpHandler implements HttpHandler {
	  public void handle(HttpExchange t) throws IOException {
	    String response = "Hello, World Ramzi!\n";
	    t.sendResponseHeaders(200, response.length());
	    OutputStream os = t.getResponseBody();
	    os.write(response.getBytes());
	    os.close();
	  }
}

public class SimpleWebServer extends Thread {

    public static final String VERSION = "WebMobinet WebServer";
    public static final Hashtable MIME_TYPES = new Hashtable();
    
    static {
        String image = "image/";
        MIME_TYPES.put(".gif", image + "gif");
        MIME_TYPES.put(".jpg", image + "jpeg");
        MIME_TYPES.put(".jpeg", image + "jpeg");
        MIME_TYPES.put(".png", image + "png");
        String text = "text/";
	MIME_TYPES.put(".js", text + "javascript");
	MIME_TYPES.put(".css", text + "css");
        MIME_TYPES.put(".html", text + "html");
        MIME_TYPES.put(".htm", text + "html");
        MIME_TYPES.put(".txt", text + "plain");
    }
    
    public SimpleWebServer(File rootDir, int port) throws IOException {
        _rootDir = rootDir.getCanonicalFile();
        if (!_rootDir.isDirectory()) {
            throw new IOException("Not a directory.");
        }
        _serverSocket = new ServerSocket(port);
        start();
    }
    
    public void run() {
        while (_running) {
            try {
            	HttpServer server = HttpServer.create(new InetSocketAddress(8000),0);
            	server.createContext("/", new MyHttpHandler());
            	server.start();
            }
            catch (IOException e) {
                System.exit(1);
            }
        }
    }
    
    // Work out the filename extension.  If there isn't one, we keep
    // it as the empty string ("").
    public static String getExtension(java.io.File file) {
        String extension = "";
        String filename = file.getName();
        int dotPos = filename.lastIndexOf(".");
        if (dotPos >= 0) {
            extension = filename.substring(dotPos);
        }
        return extension.toLowerCase();
    }

    
    public static void main(String[] args) {
	int port = 8000;
	String path=args.length>0?args[0]:"./";
	String webmobinetpath=System.getProperty("user.home")+"/.webmobinet/";

	try {
	    String cmds[] = {"/usr/sbin/fuser","-k","8000/tcp"};
	    Process p = Runtime.getRuntime().exec(cmds);
	    p.waitFor();
	    System.out.println("killing all processes on 8000 port");
	} catch (Exception eex) {
	    eex.printStackTrace();
	}
        try {
		File file = new File(webmobinetpath+"js/current_dir.js");
		FileWriter writer = new FileWriter(file, true);
		PrintWriter output = new PrintWriter(writer);
		output.print("var home_path='"+webmobinetpath+"';");
		System.out.println("Dir: "+webmobinetpath);
		output.close();
        	
            SimpleWebServer server = new SimpleWebServer(new File(path), port);
            System.out.println("webmobinet Webserver running");
        }
        catch (IOException e) {
            System.out.println(e);
	    port++;
		try {
		    SimpleWebServer server = new SimpleWebServer(new File(path), port);
		    System.out.println("webmobinet Webserver running");
		}
		catch (IOException exep) {
		}
        }
	try {
	    String cmds[] = {"/usr/bin/google-chrome","http://127.0.0.1:"+port};
	    Process p = Runtime.getRuntime().exec(cmds);
	    p.waitFor();
	    System.out.println("Google Chrome launched!");
	} catch (Exception eex) {
	    eex.printStackTrace();
	}
    }
    
    private File _rootDir;
    private ServerSocket _serverSocket;
    private boolean _running = true;

}
