namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_5 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Sample", "SampleClassId", "dbo.SampleClass");
            DropIndex("dbo.Sample", new[] { "SampleClassId" });
            CreateTable(
                "dbo.ServiceCenter",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Identification = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Sample", "ServiceCenterId", c => c.Int());
            AlterColumn("dbo.Sample", "SampleClassId", c => c.Int());
            CreateIndex("dbo.Sample", "SampleClassId");
            CreateIndex("dbo.Sample", "ServiceCenterId");
            AddForeignKey("dbo.Sample", "ServiceCenterId", "dbo.ServiceCenter", "Id");
            AddForeignKey("dbo.Sample", "SampleClassId", "dbo.SampleClass", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sample", "SampleClassId", "dbo.SampleClass");
            DropForeignKey("dbo.Sample", "ServiceCenterId", "dbo.ServiceCenter");
            DropIndex("dbo.Sample", new[] { "ServiceCenterId" });
            DropIndex("dbo.Sample", new[] { "SampleClassId" });
            AlterColumn("dbo.Sample", "SampleClassId", c => c.Int(nullable: false));
            DropColumn("dbo.Sample", "ServiceCenterId");
            DropTable("dbo.ServiceCenter");
            CreateIndex("dbo.Sample", "SampleClassId");
            AddForeignKey("dbo.Sample", "SampleClassId", "dbo.SampleClass", "Id", cascadeDelete: true);
        }
    }
}
