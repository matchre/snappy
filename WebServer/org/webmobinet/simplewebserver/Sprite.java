package org.webmobinet.simplewebserver;

class Sprite {
	float x,y;
	String name;
	String senderIp;
	String image;
	/**
	 * @param x
	 * @param y
	 * @param name
	 * @param senderIp
	 * @param image
	 */
	public Sprite(float x, float y, String name, String senderIp, String image) {
		super();
		this.x = x;
		this.y = y;
		this.name = name;
		this.senderIp = senderIp;
		this.image = image;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Sprite [x=" + x + ", y=" + y + ", name=" + name + ", senderIp="
				+ senderIp + ", image=" + image + "]";
	}
	/**
	 * @return the image
	 */
	public String getImage() {
		return image;
	}
	/**
	 * @param image the image to set
	 */
	public void setImage(String image) {
		this.image = image;
	}
	/**
	 * @return the x
	 */
	public float getX() {
		return x;
	}
	/**
	 * @param x the x to set
	 */
	public void setX(float x) {
		this.x = x;
	}
	/**
	 * @return the y
	 */
	public float getY() {
		return y;
	}
	/**
	 * @param y the y to set
	 */
	public void setY(float y) {
		this.y = y;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the senderIp
	 */
	public String getSenderIp() {
		return senderIp;
	}
	/**
	 * @param senderIp the senderIp to set
	 */
	public void setSenderIp(String senderIp) {
		this.senderIp = senderIp;
	}
	
	
}