variable "vpc_id" {
  description = "VPCのID"
  type        = string
}

variable  "env" {
  description = "環境名"
  type        = string
}

variable "product_name" {
  description = "プロダクト名"
  type        = string
}

variable "my_ips" {
  description = "自分のIPアドレス"
  type        = list(string)
}

variable "private_subnet_cidr" {
  description = "プライベートサブネットのCIDR"
  type        = string
}
