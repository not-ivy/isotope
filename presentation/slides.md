# Isotope

Hello everyone!

---

# Why I Created This Project

---

# ECC

Stands for Elliptic Curve Cryptography; Used in multiple applications where
identity verification and encryption are critical

---

# Pros and Cons

---

# Flow

- Join
- Accepted
- Beat
- Message
- Rotation
- Termination

---

# Join Payload

```
Total of 195 bytes;
+------+----------------+---------------+----------------+
| 0x05 | ecdsa key (65) | ecdh key (65) | signature (64) |
+------+----------------+---------------+----------------+
```

---

# Accepted Payload

```
+------+-------------+----------------+-----------+
| 0x06 | pubKey (33) | signature (64) | hash (32) |
+------+-------------+----------------+-----------+
```

Calculates shared key(ecdh)

---
