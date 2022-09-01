<?php 
  class Database {
    // DB Params
    private $host = 'app.pharmaiot.pt';
    private $db_name = 'pharmaio_app';
    private $username = 'pharmaio_app';
    private $password = 'qFf25VZs2p355qTu';
    private $conn;

  public function getDbName() {
      return $this->db_name;
  }

  public function getHost() {
    return $this->host;
}

  public function setDbName($db_name) {
    $this->db_name = $db_name;
  }

  public function setUserName($username) {
    $this->username = $username;
  }

  public function setHost($host) {
    $this->host = $host;
  }


    // DB Connect
    public function connect() {
      $this->conn = null;

      try { 
        $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch(PDOException $e) {
        echo 'Connection Error: ' . $e->getMessage();
      }

      return $this->conn;
    }
  }