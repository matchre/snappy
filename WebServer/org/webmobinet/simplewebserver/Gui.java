package org.webmobinet.simplewebserver;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import java.net.URI;

import java.awt.Color;
import java.awt.Desktop;

import javax.swing.JLabel;
import javax.swing.ImageIcon;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.UnknownHostException;

import javax.swing.JTextField;
import javax.swing.JButton;

public class Gui extends JFrame {

	private JPanel contentPane;
	private JTextField myipaddressField;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Gui frame = new Gui();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	public static void openWebpage(URI uri) {
	    Desktop desktop = Desktop.isDesktopSupported() ? Desktop.getDesktop() : null;
	    if (desktop != null && desktop.isSupported(Desktop.Action.BROWSE)) {
	        try {
	            desktop.browse(uri);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	}

	public static void openWebpage(URL url) {
	    try {
	        openWebpage(url.toURI());
	    } catch (URISyntaxException e) {
	        e.printStackTrace();
	    }
	}


	public static void openWebpage(String url) {
	    try {
	        openWebpage(new URL(url));
	    } catch (MalformedURLException e) {
	        e.printStackTrace();
	    }
	}
	
	public static void openLocalWebpage(String filename) {
	    try {
	        openWebpage(new URL("http://"+InetAddress.getLocalHost().getHostAddress()+":"+WebMobinetHttpServer.myport+"/"+filename));
	    } catch (MalformedURLException | UnknownHostException e) {
	        e.printStackTrace();
	    }
	}
	/**
	 * Create the frame.
	 * @throws UnknownHostException 
	 */
	public Gui() throws UnknownHostException {
		setBackground(Color.DARK_GRAY);
		setResizable(false);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 750, 386);
		contentPane = new JPanel();
		contentPane.setBackground(Color.DARK_GRAY);
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		contentPane.setLayout(new BorderLayout(0, 0));
		setContentPane(contentPane);
		
		JPanel panel = new JPanel();
		panel.setBackground(Color.DARK_GRAY);
		contentPane.add(panel, BorderLayout.NORTH);
		
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setIcon(new ImageIcon(Gui.class.getResource("/org/webmobinet/simplewebserver/logo-snappy.png")));
		panel.add(lblNewLabel);
		
		JPanel panel_1 = new JPanel();
		panel_1.setBackground(Color.DARK_GRAY);
		contentPane.add(panel_1, BorderLayout.CENTER);
		panel_1.setLayout(new BorderLayout(0, 0));
		
		JPanel panel_2 = new JPanel();
		panel_2.setBackground(Color.DARK_GRAY);
		panel_1.add(panel_2, BorderLayout.NORTH);
		panel_2.setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));
		
		JLabel lblVotreAdresseIp = new JLabel("Votre Adresse Ip est :");
		lblVotreAdresseIp.setForeground(Color.WHITE);
		panel_2.add(lblVotreAdresseIp);
		
		myipaddressField = new JTextField();
		panel_2.add(myipaddressField);
		myipaddressField.setColumns(20);
		myipaddressField.setText("http://"+InetAddress.getLocalHost().getHostAddress()+":"+WebMobinetHttpServer.myport);
		
		JButton btnFermerLeServeur = new JButton("Fermer le Serveur Snappy");
		panel_1.add(btnFermerLeServeur, BorderLayout.SOUTH);
		
		JPanel panel_3 = new JPanel();
		panel_3.setBackground(Color.DARK_GRAY);
		panel_1.add(panel_3, BorderLayout.CENTER);
		panel_3.setLayout(null);
		
		JButton btnCommentCrerUne = new JButton("Comment créer une activité?");
		btnCommentCrerUne.setBounds(387, 122, 339, 25);
		panel_3.add(btnCommentCrerUne);
		
		JButton btnCommentUtilis = new JButton("Comment utiliser Snappy?");
		btnCommentUtilis.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnCommentUtilis.setBounds(387, 85, 339, 25);
		panel_3.add(btnCommentUtilis);
		
		JButton btnCommentOuvrirdropb = new JButton("Comment ouvrir une activité de dropbox?");
		btnCommentOuvrirdropb.setBounds(12, 122, 339, 25);
		panel_3.add(btnCommentOuvrirdropb);
		
		JButton btnOpenSnappy = new JButton("Ouvrir Snappy!");
		btnOpenSnappy.setBackground(Color.ORANGE);
		btnOpenSnappy.setBounds(12, 30, 714, 43);
		panel_3.add(btnOpenSnappy);
		
		JButton btnCommentOuvrirdrive = new JButton("Comment ouvrir une activité de gDrive?");
		btnCommentOuvrirdrive.setBounds(12, 85, 339, 25);
		panel_3.add(btnCommentOuvrirdrive);
		btnFermerLeServeur.addActionListener(new ActionListener() {
		    public void actionPerformed(ActionEvent e)
		    {
		        System.exit(0);
		    }
		});
		btnOpenSnappy.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e)
		    {
		        openLocalWebpage("index.html");
		    }
		});
		btnCommentUtilis.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e)
		    {
		        openLocalWebpage("Guide_de_snappy/guide_snappy.html");
		    }
		});
		btnCommentOuvrirdrive.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e)
		    {
		        openLocalWebpage("Guide_de_snappy/guide_googledrive.html");
		    }
		});
		btnCommentOuvrirdropb.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e)
		    {
		        openLocalWebpage("Guide_de_snappy/guide_dropbox.html");
		    }
		});
		
		btnCommentCrerUne.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e)
		    {
		        openLocalWebpage("Guide_de_snappy/guide_activity.html");
		    }
		});
	}
}
