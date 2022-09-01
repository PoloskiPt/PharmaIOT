<?php 
  class Database {
    // DB Params
    //blank for security reasons;
    private $host = '';
    private $db_name = '';
    private $username = '';
    private $password = '' 
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
