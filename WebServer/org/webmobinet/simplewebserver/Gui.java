package org.webmobinet.simplewebserver;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.Color;
import javax.swing.JLabel;
import javax.swing.ImageIcon;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.InetAddress;
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

	/**
	 * Create the frame.
	 * @throws UnknownHostException 
	 */
	public Gui() throws UnknownHostException {
		setBackground(Color.DARK_GRAY);
		setResizable(false);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 590, 386);
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
		btnFermerLeServeur.addActionListener(new ActionListener() {
		    public void actionPerformed(ActionEvent e)
		    {
		        System.exit(0);
		    }
		});
	}

}
